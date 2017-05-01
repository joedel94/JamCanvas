from azure.storage.blob import BlockBlobService
from azure.storage.blob import PublicAccess
from azure.storage.blob import ContentSettings

config={}
config['account_name'] = 'jamcanvaspoc'
config['account_key'] = 'Ko5+SQT0QICzltWXt9O63deEeUDq1M/K7vExoeNPF3tPBgA1gZWSJj92JQ4O1YL4woA6UtyXeVRlarDXzjuX6A=='
config['container'] = 'mycontainer'
config['blob'] = 'myblockblob'
config['path'] = 'test.mp3'
config['content_type'] = 'upload/mp3'

block_blob_service = BlockBlobService(account_name=config['account_name'], account_key=config['account_key'])
block_blob_service.create_container(config['container'], public_access=PublicAccess.Container)
block_blob_service.create_blob_from_path(config['container'], config['blob'], config['path'], content_settings=ContentSettings(content_type=config['content_type'])
	)

generator = block_blob_service.list_blobs(config['container'])
for blob in generator:
	print(blob.name)


block_blob_service.get_blob_to_path(config['container'], config['blob'], 'out'+config['path'])