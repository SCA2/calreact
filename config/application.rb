require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Calreact
  class Application < Rails::Application
    config.api_only = true
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:8080'
        resource '*', headers: :any, methods: [:get, :post, :patch, :options]
      end
    end
  end
end
