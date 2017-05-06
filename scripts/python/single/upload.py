from azure.storage.blob import BlockBlobService
from azure.storage.blob import PublicAccess
from azure.storage.blob import ContentSettings
import os

config={}
config['account_name'] = 'jamcanvas1727'
config['account_key'] = 'CpklHsCHIvpt/tyx1b/5YwumPefra8yN5QMRq0r7kSUKONh/nTOXgHbibTzx5oiH29FPeNe9Cxowp+r82v+Ihw=='

#Initiate global Blob Service
blob_service = BlockBlobService(account_name=config['account_name'], account_key=config['account_key'])

#Path is the path to a local file, container is the session GUID
def createBlobFromPath(container, path):
	#Check if container currently exists, if not create it
	if not blob_service.exists(container):
		blob_service.create_container(container, public_access=PublicAccess.Container)

	#start with C:/example/path.mp3
	blobName = os.path.split(path)[-1]					#path.mp3
	contentType = 'upload/' + blobName.split('.')[-1]	#upload/mp3

	#Upload the file
	blob_service.create_blob_from_path(container, blobName, path, content_settings=ContentSettings(content_type=contentType))

#Same as fromPath but uses an open file stream
#Includes additional params:
#	blobName since there is no path to pull it from. Should be something like name.mp3
#	contentType for same reason as above. Should be something along the lines of upload/mp3 (assuming the file is an mp3)
def createBlobFromStream(container, stream, blobName, contentType):
	#Check if container currently exists, if not create it
	if not blob_service.exists(container):
		blob_service.create_container(container, public_access=PublicAccess.Container)

	#Upload the stream contents
	blob_service.create_blob_from_stream(container, blobName, stream, content_settings=ContentSettings(content_type=contentType))

#Same as from path but uses byte data
#See fromStream for additional param explanations
def createBlobFromBytes(container, byteContent, blobName, contentType):
	#Check if container currently exists, if not create it
	if not blob_service.exists(container):
		blob_service.create_container(container, public_access=PublicAccess.Container)

	#Upload the bytes
	blob_service.create_blob_from_bytes(container, blobName, byteContent, content_settings=ContentSettings(content_type=contentType))

#Container is the session GUID
def listBlobsByContainer(container):
	if blob_service.exists(container):
		#Create an iterator of all blobs in the container and perform actions
		generator = blob_service.list_blobs(container)
		for blob in generator:
			#Prints for now, can instead return a list of all for display purposes
			print(blob.name)

#Retrieves the contents of a blob and saves it locally to the path specified
def getBlob(container, blobName, path):
	blob_service.get_blob_to_path(container, blobName, path)

#Deletes the container specified, probably will be called on session expiration
def deleteContainer(container):
	blob_service.delete_container(container)

def main():
	print('Do not run this script directly')

if __name__ == '__main__':
	main()