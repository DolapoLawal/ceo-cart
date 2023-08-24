async function ImagetoBase64(file){
    const reader = new FileReader()
    reader.readAsDataURL(file)

    const data = new Promise((resolve,reject)=>{
        reader.onload = ()=> resolve(reader.result)
        reader.onerror = err => reject(err)
    })

    return data
}

export {ImagetoBase64}

// const uploadImage = async (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const data = await ImagetoBase64(file);
//       setData((prevData) => ({ ...prevData, image: data }));
//     }
//   };
  
