# Welcome to marketly

A modern ecommerce website.

## Quickstart guide

setup the project:

    make setup

To simplify development docker don't handle frontend package Installation (Not Ideal In a real world project) so navigate to the frontend directory and Install using npm:

    cd frontend
    npm install
    cd ..

Start the project:

    make up or make setup
    
and bring it down when you are down:

    make down
    
To test the project run:

    make test
    
To create an optimised production build do:

    make build VERSION=0.0.0
    
To push the optimised images to the registry do:

    make push VERSION=0.0.0

Authentication Token should follow this structure:

    Authorization: Token ${token}


