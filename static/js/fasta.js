$(function(){
	/*caching jquery DOM objects*/
	var $fastaFile = $('#fasta_file');
	var $fastaFileName = $('#fasta_file_name');
	var $fastaFileViewer = $('#fasta_file_shower');
	var $fastaUploadStatus = $('#fasta_file_upload_status');
	var $fastaFileHeader = $('#fasta_file_header'); 
	var $fastaFileContent = $('#fasta_file_content');
	var $fastaUploadButton = $('#fasta_file_upload');
	
	
	$fastaFileViewer.hide()
	
	/*sets file name in the fileupload input*/
	var getFileName = function(){
		var fileName = $(this).val();
		$fastaFileName.text(fileName.split('\\').pop());
	}
	
	/*rests text data for the applied dom element*/
	var resetTextData = function(){
		$(this).text('')
		
	}
	
	/*executes if the upload is success*/
	var uploadSuccess = function(data){
		cleanFileInput();
		$fastaUploadStatus.text('Success!');
		/*parse new data*/
		var data = JSON.parse(data); 
		
		/*parse and show new data*/
		$fastaFileHeader.text(data.header?data.header:''); 
		$fastaFileContent.text(data.content?data.content:'');
		$fastaFileViewer.show()
	}
	
	/*executes if the upload has failed*/
	var uploadFail = function(data){
		cleanFileInput();
		/*shows the error message received from server*/
		$fastaUploadStatus.text(data.responseText);
	}
	
	/*cleans file input once an upload is complete, irrespective of failure or success*/
	var cleanFileInput = function(data){
		
		/*cleaning input*/
		$($fastaFile).val('')
		resetTextData.apply($fastaFileName)
		
		/*clean old file data*/
		resetTextData.apply($fastaFileHeader)
		resetTextData.apply($fastaFileContent)
		
		/*enabling upload since the ajax is complete to allow more uploads*/
		$fastaUploadButton.prop( "disabled", false );
	}
	
	
	var disableUpload = function(){
		/*disabling upload once an upload is in progress*/
		$fastaUploadButton.prop( "disabled", true );
	} 
	
	var fileUpload = function(){
		if(!$fastaFile.val().length) 
			return false; 
		
		/*uploading the file*/
		var formData = new FormData($('#fasta_upload_form')[0]); 
		$.ajax({
			  method:'post',
			  url: 'upload',
			  data: formData,
			  beforeSend:disableUpload,
			  contentType: false,
			  processData: false,
		}).done(uploadSuccess).error(uploadFail);
	}
	

	
	$fastaFile.change(getFileName);
	$fastaUploadButton.click(fileUpload);
	
})