## Challenge 5 Synergy

### Links : 
 - POST api/users/:
   Add Users to the table
   - name : string
   - email : string
   - profile_picture_url : file
 - GET api/users/?name=name : 
   Fetch users from the table using specific name
 
 - POST api/cars/:
   Add Cars to the table
   - name : string
   - price : number
   - size : number
   - picture : file
 - GET api/cars/?name=name : 
   Fetch cars from the table using specific name
 - POST api/cars/edit?id=id:
   Edit a specific car row using id
   - name : string
   - price : number
   - size : number
   - picture : file
 - GET api/cars/delete?id=id:
   Delete a specific car row using id

### ERD :
![Alt text](./ERD.svg)<img src="./ERD.svg">
