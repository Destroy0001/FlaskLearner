import json
import os
import datetime

from flask import Blueprint
from flask import request, make_response

from flask_application.controllers import TemplateView
from flask_application.models import db
from flask_application.fastaUploader.models import Fasta

from binaryornot.check import is_binary


fasta = Blueprint('fasta', __name__, url_prefix='/fasta')

class FastaView(TemplateView):
    blueprint = fasta
    route = '/'
    route_name = 'fastaIndex'
    template_name = 'fasta/index.html'
        
class FastaUpload(TemplateView):
    blueprint = fasta
    route = '/upload'
    route_name = 'fastaUpload'
    methods = ['POST']
    
    def post(self, *args, **kwargs):
        file = request.files.get('fasta_file')
        if not file:
            return make_response('Please upload a file!','400')
        
        #store file in tmp directory
        save_path = '/tmp/fastaUploaded'
        if not os.path.exists(save_path):
            os.makedirs(save_path)
        
        file_path = "{path}/{file}_{time_stamp}".format(path=save_path, file=file.filename,time_stamp=datetime.datetime.now())
        file.save(file_path)
        
        #check if file is readable
        is_readable_file = not is_binary(file_path)
        if not is_readable_file:
            os.remove(file_path)
            return make_response('Invalid File type!',400)
        
        #check if file content is inf fasta format or not
        file_content = open(file_path).read()
        if not self.check_fasta_file(file_content):
            os.remove(file_path)
            return make_response('Invalid File content!',400)
        
        #process and insert file data to db
        file = file_content.splitlines(True)
        file_data = self.process_fasta_file(file)
        if not self.insert_fasta_data(file_data):
            os.remove(file_path)
            return make_response('Internal Server Error',500)
        
        #return response to display file data on ui
        os.remove(file_path)
        return make_response(json.dumps(file_data))
        
            
    def insert_fasta_data(self,file):
        try:
            fasta = Fasta(header=file['header'],data = file['content'])
            db.session.add(fasta);
            db.session.commit();
        except error:  
            return False;
            
        return True;
            
        
    def check_fasta_file(self,content):
        return content[0] == '>' and len(content.splitlines(False)) > 1
        
    def process_fasta_file(self,file):
        header = file[0].strip('>\n')
        content = ''.join(file[1:len(file)])
        return {'header':header,'content':content}
        