# NZ Veterinary Locum Network - Frontend
<table>
<tr>
<td>

<h4>About This Project</h4>

  In order to market themselves and look for jobs, there hasn't been a website created exclusively for veterinary locums in New Zealand. 
  <br></br>
  This project intends to develop a platform where veterinary locums can create profiles and introduce themselves and companies can post job vacancies for locums.
We resolve the current communication issue by facilitating direct communication between veterinarian offices and locum tenens.

<h4>Why is this problem valuable to address?</h4>

There is still no infrastructure that enables veterinary locums to openly promote themselves outside of a recruitment agency, 
making it very difficult for locums and clinics to connect without third-party intervention (recruitment agency). 
If new veterinary locums don't already have personal relationships with clinics, finding one can be very challenging. 
They have no platform to view and identify the clinics that require them. Currently, a Facebook group is the only location locums may access information. 
My aim is to have all doctors' information in a beautiful, 
understandable style so that they don't have to wade through several Facebook postings to figure out which locum is reliable and reachable for a clinic.

<h4>Goals</h4>
With this project, I intend to make it easier for veterinary clinics and locums to organize employment on their own without the use 
of a recruitment firm by centralizing lists of available jobs and veterinary locums.
The NZ Veterinary Locum Network will be the only platform to keep track of veterinary locum's profiles that are visible to the public online, 
filling a specialized need for a distinct sector on the website rather than specialized Facebook groups.

</td>
</tr>
</table>

## Screenshots
![](https://github.com/applescan/NZ-Veterinary-Locum-Frontend/blob/main/src/images/Capstone%20cover.png)


## Demo
Here is a working live demo :  https://nz-locum-network.netlify.app/

## Figma 
- Software Architecture and Task Timeline: https://www.figma.com/file/kqeMSGwcqMYjBFViLUcspq/NZ-Veterinary-Locum?node-id=0%3A1&t=IdnttLOPOBcoOuM0-0
- Wireframe designs: https://www.figma.com/file/kqeMSGwcqMYjBFViLUcspq/NZ-Veterinary-Locum?node-id=2%3A2&t=IdnttLOPOBcoOuM0-0

### Built with
•	Axios
•	Bootstrap
•	CSS
•	Canva
•	Figma
•	React
•	MUI
•	MDB Bootstrap
•	Express.js
•	JavaScript
•	MongoDB
•	Node.js

### User Guide
How to run on your own system using NZ Veterinary Locum online back-end server:
- Copy/fork this repository to your github/local drive
- In the folder, run the command ``npm install``
- In the folder, run the command ``npm start``
- Once running, open a browser and open ``http://localhost:3000``
- If everything was successful, the page will show up.

How to run on your own system using localhost:
- Copy/fork this repository to your github/local drive
- In the folder, run the command ``npm install``
- Change all the links for all axios and fetch request to "http://localhost:4000/url/path". Url and path respective to each route you're trying to access
- In the folder, run the command ``npm start``
- Once running, open a browser and open ``http://localhost:3000``
- If everything was successful, the page will show up.

### Bug / Feature Request
- Known limitations: When you register a user, any uploaded image that's larger than 1 Mb will not go through, this is because the TSL certificate from the cloud server is built with an older version of security policies, your browser won't allow a large file to be sent. The console log will show that it's a CORS issue.. More information regarding TSL certificate can be found here https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html
- If you're running the backend in your local, there should be no problem with CORS and uploading image larger than 1mb.
- If you discover more bug (the website was unable to process the query and/or returned undesirable results), kindly open an issue [here](https://github.com/applescan/NZ-Veterinary-Locum-Frontend/issues/new) by mentioning your search term and the desired outcome. 

## Author

- Website - https://applescan.github.io/Portfolio-Website/

## License

MIT © Felicia Fel
