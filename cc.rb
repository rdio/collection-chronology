require 'sinatra'
require './rdio'

rdio = Rdio.new ENV["RDIO_API_KEY"], ENV["RDIO_API_SHARED_SECRET"]

DOMAIN = ENV["DOMAIN"]

set :public, File.dirname(__FILE__) + '/static'

get '/' do
  redirect '/main.html'
end

get '/user/:vanityName' do |vanityName|
  content_type 'application/json', :charset => 'utf-8' # it's json
  cache_control :public, :max_age => 60*60 # cache it for an hour
  (rdio.findUser :vanityName => vanityName).to_json
end

get '/albums/:user/:page' do |user, page|
  content_type 'application/json', :charset => 'utf-8' # it's json
  cache_control :public, :max_age => 60*60 # cache it for an hour
  (rdio.getAlbumsInCollection :user=>user, :count => 20, :start => 20*page.to_i).to_json
end

get '/flashvars' do
  content_type 'application/json', :charset => 'utf-8' # it's json
  cache_control :private
  {
    :playbackToken => (rdio.getPlaybackToken :domain => DOMAIN),
    :domain => DOMAIN
  }.to_json
end

