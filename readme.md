Sample Fasta File Reader project, made over flask. 

set up 
1. Download via git:

        git https://github.com/ajzone007/FlaskLearner.git

2. Change into the cloned directory

        cd FlaskLearner

3. install python-pip, sqlite 
	
	ubuntu/debian
	sudo apt-get install python-pip 
	sudo apt-get install sqlite

4. install virtualenvironment
	sudo pip install virtualenv
	
3. Create a virtualenvironment

        virtualenv environment
	source environment/bin/activate

4. Install the required python dependancies:

        pip install -r requirements.txt

5. create sqlite db 
	
	sqlite flask.db 
    
6. Edit `flask_application/config.py` to change your sqlite path

       set your sqllite config 
            # SQLAlchemy support
            self.SQLALCHEMY_DATABASE_URI = 'sqlite://path//to//application//flask.db'
    
7. init your db and create database 
	python manage.py db init
	python manage.py db migrate 
	python manage.py db upgrade 
           
7. Run a development server:
        python manage.py runserver

The development server as per the default config would start on localhost:5000 
change the self.SERVER_NAME to the domain you want to start it on.

You can test the application on 
	localhost:5000/fasta 
