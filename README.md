HamCam
============

Quick christmas ham camera proto.

1.  Takes picture with webcam every minute and sends it to server
2.  Server saves the image to Dropbox
3.  ???
4.  Profit

#HOWTO

Change ```var saveFilesTo = '../../../Dropbox/kinkkukamera'``` from index.js to the folder you want the files to be saved to.

Run:

	$ npm install
	$ node index.js

Go to http://localhost:3000/

Allow the camera access and press "Aloita"

![](https://github.com/jakate/kinkkukamera/blob/master/eamples/demo1.jpeg)
![](https://github.com/jakate/kinkkukamera/blob/master/eamples/demo2.jpeg)
