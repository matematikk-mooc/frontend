server 'udir-front.staging.devguru.co', user: 'deploy', roles: %w[app css]

set :branch, 'UDIR-77-final-structure-for-login-modal'

namespace :deploy do
  def compose(cmd, role)
    "-p #{fetch(:application)} -f docker-compose-#{fetch(:stage)}.yml #{cmd}"
  end

  after :updated, 'udir:deploy' do
    ## build image on all nodes
    on roles(:css), in: :parallel do
      within release_path do
        execute :"docker-compose", compose("build", "css")
      end
    end

    ## restart web containers
    on roles(:css), in: :parallel do
      within release_path do
        execute :"docker-compose", compose("up -d --force-recreate", "css")
      end
    end
  end
end
