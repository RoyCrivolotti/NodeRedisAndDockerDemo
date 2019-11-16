# NodeRedisAndDockerDemo

I just wanted to try out Redis and learn how to use Docker compose to manage multiple containers at once. I used a super basic front-end I wrote with `pug` for my first docker demo app, which is also uploaded to a repo on this GitHub account.

To use this I simply use `docker-compose up` from the root project's directory. If you stop and run the app again without removing it, it should persist the data, since it's using volumes for that reason.