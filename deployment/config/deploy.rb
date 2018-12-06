lock '3.9.0'

set :application, 'udir-frontend'
set :repo_url, 'git@github.com:netguru/UDIR-frontend.git'
set :deploy_to, -> { "/home/deploy/apps/#{fetch(:application)}" }
