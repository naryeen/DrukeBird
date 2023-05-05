// import React, { useState } from "react";
// import {TextInput } from 'react-native-paper';
// import {StyleSheet, View,Text, ScrollView} from 'react-native';
// import Button from '../Components/Button';
// import axios from "axios";
// import baseURL from "../Connection/connect";


// const SignUp = ({navigation}) => {
//   // const buttonstyle = {
//   //   marginTop:50,
//   //   backgroundColor:"red"
//   // }
// const [name, setname] = useState("");
// const [email, setEmail] = useState("");
// const [DoB, setDoB] = useState("");
// const [country, setcountry] = useState("");
// const [profession, setprofession] = useState("");
// const [password, setpassword] = useState("");
// const [passwordConfirm, setpasswordConfirm] = useState("");
// const [error, setError] = useState("");
// const [isLoading, setIsLoading] = useState(false);

// const onChangeNameHandler = (name) => {
//   setname(name);
// };

// const onChangeEmailHandler = (email) => {
//   setEmail(email);
// };

// const onChangeDoBHandler = (DoB) => {
//   setDoB(DoB);
// };

// const onChangeCountryHandler = (country) => {
//   setcountry(country);
// };

// const onChangeProfessionHandler = (profession) => {
//   setprofession(profession);
// };

// const onChangePasswordHandler = (password) => {
//   setpassword(password);
// };

// const onChangeConfirmPasswordHandler = (passwordConfirm) => {
//   setpasswordConfirm(passwordConfirm);
// };






// const onSubmitFormHandler = async (event) => {
//   event.preventDefault();
//   if (!name.trim()) {
//     alert("Enter Your Name");
//     return;
//   }
//   if(!email.trim())
//   {
//     alert("Enter Your Email");
//     return;
//   }
//   if(!DoB.trim())
//   {
//     alert("Enetr DoB");
//     return;
//   }
//   if(!country.trim())
//   {
//     alert("Enetr Your Country");
//     return;
//   }
//   if(!profession.trim())
//   {
//     alert("Enetr Your Profession");
//     return;
//   }
//   if(!password.trim())
//   {
//     alert("Enetr Password");
//     return;
//   }
//   if(!passwordConfirm.trim()){
//     alert("Enetr Confirm Password");
//     return;
//   }
//   try {
//     setIsLoading(true);
//     console.log("it is me")
//     console.log(`${baseURL}/api/v1/users/signUp`)
//     const response = await axios.post(`${baseURL}/api/v1/users/signUp`, {
//       name,
//       email,
//       DoB,
//       country,
//       profession,
//       password,
//       passwordConfirm
//     });

//   if (response.status === 201) {
//     console.log("where i am")
//       alert(` You have created: ${JSON.stringify(response.data)}`);
//       setIsLoading(false);
//       setname('');
//       setEmail('');
//       setDoB('');
//       setcountry('');
//       setprofession('');
//       setpassword('');
//       setpasswordConfirm('')
//     } else {
//       throw new Error("An error has occurred");
//     }

//     } 
    
//     catch (error) {
//       alert(error);
//       setIsLoading(false);
//     }
// return (
//     <View style={styles.container}>
//     {/* <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} > */}
//     <Text style={styles.text1}>
//       Create Account
//     </Text>
//     <ScrollView>
//     <TextInput
//     style={styles.name}
//       mode="outlined"
//       label="Name" 
//       placeholder="Write Your Name"
//       left={<TextInput.Icon icon="account-circle" />}
//       value={Name}
//       editable={!isLoading}
//       onChangeText={onChangeNameHandler}
//     />
//     <TextInput
//     style={styles.email}
//       mode="outlined"
//       label="Email"
//       placeholder="Write Your Email"
//       left={<TextInput.Icon icon="email" />}
//       value={email}
//       editable={!isLoading}
//       onChangeText={onChangeEmailHandler}
//     />

//     <TextInput
//     style={styles.dob}
//       mode="outlined"
//       label="DoB"
//       placeholder="Write Your DoB"
//       left={<TextInput.Icon icon="calendar" />}
//       value={DoB}
//       editable={!isLoading}
//       onChangeText={onChangeDoBHandler}
//     />
//     <TextInput
//     style={styles.country}
//       mode="outlined"
//       label="Country"
//       placeholder="Write Your Country"
//       left={<TextInput.Icon icon="flag" />}
//       value={country}
//       editable={!isLoading}
//       onChangeText={onChangeCountryHandler}
//     />

//     <TextInput
//     style={styles.profession}
//       mode="outlined"
//       label="Profession"
//       placeholder="Write Your Profession"
//       left={<TextInput.Icon icon="briefcase" />}
//       value={profession}
//       editable={!isLoading}
//       onChangeText={handleChange}
//     />
//     <TextInput
//     style={styles.password}
//       mode="outlined"
//       secureTextEntry = {true}
//       label="Password"
//       placeholder="Write Your Password"
//       left={<TextInput.Icon icon="lock" />}
//       value={password}
//       editable={!isLoading}
//       onChangeText={onChangePasswordHandler}
//     />
//     <TextInput
//     style={styles.cpassword}
//       mode="outlined"
//       secureTextEntry = {true}
//       label="Confirompassword"
//       placeholder="Enter the Your Password Again"
//       left={<TextInput.Icon icon="key-variant"/>}
//       value={passwordConfirm}
//       editable={!isLoading}
//       onChangeText={onChangeConfirmPasswordHandler}
//     />
//     <Button styling={styles.buttonstyle} onPress = {onSubmitFormHandler}>Create Account</Button>
//     <Text style={styles.createtext}>
//     Already have an account?
//       <Text style={styles.loginText} onPress={()=>navigation.replace('LogIn')}>Login</Text>
//     </Text>
//     {/* </KeyboardAvoidingView> */}
//     </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container:{
//     padding:10
//   },
//   text1:{
//     marginTop:60,
//     fontSize:24,
//     fontWeight:"bold",
//     textAlign:"center"
//   },
//   name: {
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5,
    
//   },
//   email: {
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5,
    
//   },
//   dob:{
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5
//   },
//   country:{
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5
//   },
//   profession:{
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5
//   },
//   password:{
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5
//   },
//   cpassword:{
//     marginTop:20,
//     borderColor: '#ccc',
//     borderRadius: 5
//   },
//   createtext:{
//     marginTop:20,
//     textAlign:'center',
//     fontSize:14
//   },
//   loginText:
//   {
//     color:'#2437E4'
//   },
//   buttonstyle:{
//     backgroundColor:'#136D66',
//     marginTop:30,
//     width:"100%"
//   }
// });

// export default SignUp;






// import React, { useState } from "react";
// import axios from "axios";

// import "../styles/addspecies.css";

// function AddSpecies() {
//   const [formData, setFormData] = useState({
//     englishName: "",
//     scientificName: "",
//     order: "",
//     familyName: "",
//     genus: "",
//     species: "",
//     authority: "",
//     group: "",
//     dzongkhaName: "",
//     lhoName: "",
//     sharName: "",
//     khengName: "",
//     iucnStatus: "",
//     legislation: "",
//     migrationStatus: "",
//     birdType: "",
//     description: "",
//     observations: "",
//     photo: "",
//   });
//   const [file, setFile] = useState(null);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("englishName", formData.englishName);
//       formDataToSend.append("scientificName", formData.scientificName);
//       formDataToSend.append("order", formData.order);
//       formDataToSend.append("familyName", formData.familyName);
//       formDataToSend.append("genus", formData.genus);
//       formDataToSend.append("species", formData.species);
//       formDataToSend.append("authority", formData.authority);
//       formDataToSend.append("group", formData.group);
//       formDataToSend.append("dzongkhaName", formData.dzongkhaName);
//       formDataToSend.append("lhoName", formData.lhoName);
//       formDataToSend.append("sharName", formData.sharName);
//       formDataToSend.append("khengName", formData.khengName);
//       formDataToSend.append("iucnStatus", formData.iucnStatus);
//       formDataToSend.append("legislation", formData.legislation);
//       formDataToSend.append("migrationStatus", formData.migrationStatus);
//       formDataToSend.append("birdType", formData.birdType);
//       formDataToSend.append("description", formData.description);
//       formDataToSend.append("observations", formData.observations);
//       formDataToSend.append("photo", file);

//       console.log(formDataToSend);

//       await axios.post("http://localhost:8080/api/v1/species", formDataToSend);
//       // Clear the form data and file
//       setFormData({
//         englishName: "",
//         scientificName: "",
//         order: "",
//         familyName: "",
//         genus: "",
//         species: "",
//         authority: "",
//         group: "",
//         dzongkhaName: "",
//         lhoName: "",
//         sharName: "",
//         khengName: "",
//         iucnStatus: "",
//         legislation: "",
//         migrationStatus: "",
//         birdType: "",
//         description: "",
//         observations: "",
//         photo: "",
//       });
//       setFile(null);
//       // Show a success message to the user
//       alert("Species created successfully");
//     } catch (error) {
//       // Show an error message to the user
//       alert(error.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Add Species</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="speciescontainer">
//           <div className="column1">
//             <b>1. General Info</b>
//           </div>
//           <div className="column2">
//             <div>English Name</div>
//             <input
//               type="text"
//               name="englishName"
//               value={formData.englishName}
//               onChange={handleChange}
//               placeholder="Enter English Name"
//               required
//             />
//             <div>Order</div>
//             <input
//               type="text"
//               placeholder="Enter Order"
//               name="order"
//               value={formData.order}
//               onChange={handleChange}
//               required
//             />
//             <div>Genus</div>
//             <input
//               type="text"
//               placeholder="Enter Genus"
//               name="genus"
//               value={formData.genus}
//               onChange={handleChange}
//               required
//             />
//             <div>Authority</div>
//             <input
//               type="text"
//               placeholder="Enter Authority"
//               name="authority"
//               value={formData.authority}
//               onChange={handleChange}
//               required
//             />
//             <div>Dzongkha Name</div>
//             <input
//               type="text"
//               placeholder="Enter Dzongkha Name"
//               name="dzongkhaName"
//               value={formData.dzongkhaName}
//               onChange={handleChange}
//             />
//             <div>Shar Name</div>
//             <input
//               type="text"
//               placeholder="Enter Shar Name"
//               name="sharName"
//               value={formData.sharName}
//               onChange={handleChange}
//             />
//             <div>IUCN Status</div>
//             <input
//               type="text"
//               placeholder="Enter IUCN Status"
//               name="iucnStatus"
//               value={formData.iucnStatus}
//               onChange={handleChange}
//             />
//             <div>Migratory/Non-migratory</div>
//             <input
//               type="text"
//               placeholder="Enter Migratory/Non-migratory"
//               name="migrationStatus"
//               value={formData.migrationStatus}
//               onChange={handleChange}
//             />
//             <div>Species Description</div>
//             <input
//               className="description"
//               type="text"
//               placeholder="Enter Species Description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="column3">
//             <div>Scientific Name</div>
//             <input
//               type="text"
//               placeholder="Enter Scientific Name"
//               name="scientificName"
//               value={formData.scientificName}
//               onChange={handleChange}
//               required
//             />
//             <div>Family Name</div>
//             <input
//               type="text"
//               placeholder="Enter Family Name"
//               name="familyName"
//               value={formData.familyName}
//               onChange={handleChange}
//               required
//             />
//             <div>Species</div>
//             <input
//               type="text"
//               placeholder="Enter Species"
//               name="species"
//               value={formData.species}
//               onChange={handleChange}
//               required
//             />
//             <div>Group</div>
//             <input
//               type="text"
//               placeholder="Enter Group"
//               name="group"
//               value={formData.group}
//               onChange={handleChange}
//               required
//             />
//             <div>Lho Name</div>
//             <input
//               type="text"
//               placeholder="Enter Lho Name"
//               name="lhoName"
//               value={formData.lhoName}
//               onChange={handleChange}
//             />
//             <div>Kheng Name</div>
//             <input
//               type="text"
//               placeholder="Enter Kheng Name"
//               name="khengName"
//               value={formData.khengName}
//               onChange={handleChange}
//             />
//             <div>Legislation</div>
//             <input
//               type="text"
//               placeholder="Enter Legislation"
//               name="legislation"
//               value={formData.legislation}
//               onChange={handleChange}
//             />
//             <div>Waterbird/Landbird/Seabird</div>
//             <input
//               type="text"
//               placeholder="Enter Waterbird/Landbird/Seabird"
//               name="birdType"
//               value={formData.birdType}
//               onChange={handleChange}
//             />
//             <div>No. of Observation</div>
//             <div className="number-input">
//               <input
//                 className="observation-input"
//                 min="0"
//                 name="observations"
//                 value="0"
//                 type="number"
//                 onChange={handleChange}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="speciescontainer">
//           <div className="column1">2. Media</div>
//           <div className="column2">
//             <div>Image</div>
//             <input
//               type="file"
//               onChange={(event) => setFile(event.target.files[0])}
//             />
//           </div>
//           <div className="column3"></div>
//         </div>
//         <div className="speciescontainer">
//           <div className="button-container-addspecies">
//             <button className="cancle-button">Cancle</button>
//             <button className="addnew-button" type="submit">
//               Add Species
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default AddSpecies;

import React, { useState } from "react";
import axios from "axios";

function AddSpecies() {
  const [form, setForm] = useState({
    englishName: "",
    scientificName: "",
    order: "",
    familyName: "",
    genus: "",
    species: "",
    authority: "",
    group: "",
    dzongkhaName: "",
    lhoName: "",
    sharName: "",
    khengName: "",
    iucnStatus: "",
    legislation: "",
    migrationStatus: "",
    birdType: "",
    description: "",
    observations: "",
    photo: "",
  });
  const [speciesImg, setSpeciesImg] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(speciesImg);

  const handleChange = (event) => {
    if (event.target.name === "photo") {
      const file = event.target.files[0];
      TransformFileData(file);
    } else {
      setForm({ ...form, [event.target.name]: event.target.value });
    }
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSpeciesImg(reader.result);
      };
    } else {
      setSpeciesImg("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/v1/species", {
        ...form,
        photo: speciesImg,
      }); // post data to server
      console.log(res.data); // log response data
      setForm({
        englishName: "",
        scientificName: "",
        order: "",
        familyName: "",
        genus: "",
        species: "",
        authority: "",
        group: "",
        dzongkhaName: "",
        lhoName: "",
        sharName: "",
        khengName: "",
        iucnStatus: "",
        legislation: "",
        migrationStatus: "",
        birdType: "",
        description: "",
        observations: "",
        photo: "",
      }); // reset form
      setSpeciesImg("");
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response.data.message);
      console.error(err);
    } finally {
      setLoading(false); // set loading to false once user object is available or error occurs
    }
  };

  return (
    <div>
      <h1>Post Species</h1>
      <form onSubmit={handleSubmit}>
        <label>
          English Name:
          <input
            type="text"
            name="englishName"
            value={form.englishName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Scientific Name:
          <input
            type="text"
            name="scientificName"
            value={form.scientificName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Order:
          <input
            type="text"
            name="order"
            value={form.order}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Family Name:
          <input
            type="text"
            name="familyName"
            value={form.familyName}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Genus:
          <input
            type="text"
            name="genus"
            value={form.genus}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Species:
          <input
            type="text"
            name="species"
            value={form.species}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Authority:
          <input
            type="text"
            name="authority"
            value={form.authority}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Group:
          <input
            type="text"
            name="group"
            value={form.group}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Dzongkha Name:
          <input
            type="text"
            name="dzongkhaName"
            value={form.dzongkhaName}
            onChange={handleChange}
          />
        </label>
        <label>
          Lho Name:
          <input
            type="text"
            name="lhoName"
            value={form.lhoName}
            onChange={handleChange}
          />
        </label>
        <label>
          Shar Name:
          <input
            type="text"
            name="sharName"
            value={form.sharName}
            onChange={handleChange}
          />
        </label>
        <label>
          Kheng Name:
          <input
            type="text"
            name="khengName"
            value={form.khengName}
            onChange={handleChange}
          />
        </label>
        <label>
          IUCN Status:
          <input
            type="text"
            name="iucnStatus"
            value={form.iucnStatus}
            onChange={handleChange}
          />
        </label>
        <label>
          Legislation:
          <input
            type="text"
            name="legislation"
            value={form.legislation}
            onChange={handleChange}
          />
        </label>
        <label>
          Migration Status:
          <select name="migrationStatus" onChange={handleChange}>
            <option value="">Select status</option>
            <option value="migratory">Migratory</option>
            <option value="non migratory">Non Migratory</option>
          </select>
        </label>

        <br></br>
        <br></br>
        <label>
          Waterbird/Landbird/Seabird:
          <select name="birdType" onChange={handleChange}>
            <option value="">Select type</option>
            <option value="waterbird">Waterbird</option>
            <option value="landbird">Landbird</option>
            <option value="seabird">Seabird</option>
          </select>
        </label>
        <br></br>
        <br></br>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>
        <label>
          observation:
          <input
            type="text"
            name="observations"
            value={form.observations}
            onChange={handleChange}
          />
        </label>
        <label>
          Photo:
          <input
            name="photo"
            accept="image/*"
            type="file"
            onChange={handleChange}
          />
        </label>

        <button type="submit">Submit</button>
      </form>
      <br></br>
      <br></br>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: "18px",
          }}
        >
          <p>Loading....</p>
        </div>
      )}
      {error && <div className="error_msg">{error}</div>}
      {msg && <div className="success_msg">{msg}</div>}
      <br></br>
      <br></br>
      <div>
        Image Preview:
        {speciesImg ? (
          <>
            <img src={speciesImg} alt="Species" />
          </>
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </div>

      <a href="/edit-species">Edit Species</a>
    </div>
  );
}

export default AddSpecies;












