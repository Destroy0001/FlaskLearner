$(function(){
	$('fasta_file_shower').hide()
	var getFileName = function(){
		var fileName = $(this).val();
		$('#fasta_file_name').text(fileName.split('\\').pop());
	}
	
	var resetTextData = function(){
		$(this).text('')
		
	}
	var uploadSuccess = function(data){
		
		 /*cleaning input*/
		 $('#fasta_file').val('');
		 $('#fasta_file_name').text('');
		 
		 /*clean old file data*/
		 $('.fasta_file_information').each(resetTextData);
		 $('#fasta_file_upload_status').text('Success!');
		 
		 /*parse new data*/
		 var data = JSON.parse(data); 
		 
		/*parse and show new data*/
		 $('#fasta_file_data_title').text('Your file was uploaded and saved, the content of the files are as below');
		 $('#fasta_file_header').text(data.header?data.header:''); 
		 $('#fasta_file_content').text(data.content?data.content:'');
		 $('#fasta_file_shower').show()
	}
	
	var uploadFail = function(data){
		 /*cleaning input*/
		 $('#fasta_file').val('');
		 $('#fasta_file_name').text('');
		 
		 /*clean old file data*/
		 $('.fasta_file_information').each(resetTextData);
		 
		 /*Showing Error*/
		 $('#fasta_file_upload_status').text(data.responseText);
	}
	
	
	var fileUpload = function(){
		if(!$('#fasta_file').val().length) 
			return false; 
		
		/*uploading the file*/
		var formData = new FormData($('#fasta_upload_form')[0]); 
		$.ajax({
			  method:'post',
			  url: 'upload',
			  data: formData,
			  contentType: false,
			  processData: false
		}).done(uploadSuccess).error(uploadFail);
		
		return false; 
	}
	

	
	$('#fasta_file').change(getFileName);
	$('#fasta_file_upload').click(fileUpload);
	
})