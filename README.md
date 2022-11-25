# ArtWhale Server

### Members

|                                         [이주호](https://github.com/Zzu-h)                                          |                [조건우](https://github.com/gunwbro)                |                [김경](https://github.com/goldmirr)                 |
| :-----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------: |
|                                                       Android                                                       |                              Backend                               |                                 AI                                 |
| <img src="https://avatars.githubusercontent.com/u/72387349?s=400&u=e30a4278a9a8590f0c13b6edffb305c464447c1d&v=4" /> | <img src="https://avatars.githubusercontent.com/u/27036798?v=4" /> | <img src="https://avatars.githubusercontent.com/u/69791751?v=4" /> |

### Usage

1. Install [Docker](https://docs.docker.com/engine/install/ubuntu/) and [Docker Compose](https://docs.docker.com/compose/install/)
   - Docker version >= 20.10.12
   - Docker Compose version >= 1.29.2
2. Clone the repository
   ```shell
   $ git clone https://github.com/gunwbro/artwhale-server.git
   $ cd artwhale-server
   ```
3. Generate `.env` and `ormconfig.json` file
   ```shell
   $ cp .env.example .env
   $ cp ormconfig.example.json ormconfig.json
   ```
4. Run the container
   ```shell
   $ docker-compose up -d --build
   ```
5. View the Swagger documentation at: http://localhost/api-docs
