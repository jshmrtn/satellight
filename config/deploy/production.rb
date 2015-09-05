set :stage, :production
set :branch, :master

set :user, ENV['PRODUCTION_USER']
set :host, ENV['PRODUCTION_HOST']

# Simple Role Syntax
# ==================
#role :app, %w{deploy@example.com}
#role :web, %w{deploy@example.com}
#role :db,  %w{deploy@example.com}

# Extended Server Syntax
# ======================
server fetch(:host), user: fetch(:user), roles: %w{web app db}

fetch(:default_env).merge!(wp_env: :production)