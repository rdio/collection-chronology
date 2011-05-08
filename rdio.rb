require 'oauth/consumer'
OAuth::VERSION = 1

require 'json'

SITE = 'http://api.rdio.com'

PATH = '/1/'

class Rdio
  def initialize(key, secret)
    puts "Initializing Rdio consumer"
    @consumer = OAuth::Consumer.new key, secret, {:site => SITE}
    @consumer.http.read_timeout = 600 # ten-minute timeout, thanks
    puts "Initializing Rdio access token"
    @access_token = OAuth::AccessToken.new @consumer
    puts "Rdio API ready"
  end

  def method_missing(method, args = {})
    args[:method] = method.to_s
    puts "Rdio request for %s" % method.to_s
    response = @access_token.post PATH, args
    puts "Rdio request complete for %s" % method.to_s
    JSON::parse(response.body)["result"] if response.code.match("2..")
  end
end
