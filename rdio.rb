gem 'oauth'
require 'oauth/consumer'
OAuth::VERSION = 1

require 'json'

SITE = 'http://api.rdio.com'

PATH = '/1/'

class Rdio
  def initialize(key, secret)
    @consumer = OAuth::Consumer.new key, secret, {:site => SITE}
    @consumer.http.read_timeout = 600 # ten-minute timeout, thanks
    @access_token = OAuth::AccessToken.new @consumer
  end

  def method_missing(method, args)
    args[:method] = method.to_s
    response = @access_token.post PATH, args
    payload = JSON::parse response.body
    payload["result"]
  end
end
