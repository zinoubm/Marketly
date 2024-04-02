# Welcome to marketly

A modern ecommerce website.

## Quickstart guide

setup the project:

    make setup
    cd frontend
    npm install
    cd ..

Start the project:

    make up
    
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

