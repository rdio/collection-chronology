require './cc'
configure { set :server, :puma }
run Sinatra::Application
