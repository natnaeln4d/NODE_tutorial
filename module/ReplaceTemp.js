module.exports =(temp,product)=>{
    let output=temp.replace(/{%T%}/g,product.features[0])
    output=output.replace(/{%DIS%}/g,product.detail)
    output=output.replace(/{%N%}/g,product.carName)
    output=output.replace(/{%P%}/g,product.carPrice)
    output=output.replace(/{%S%}/g,product.includedInThePrice[0])
    output=output.replace(/{%PHOTO%}/g,product. images[1])
    output=output.replace(/{%ID%}/g,product.id)
         //    if(!product.status) output.replace(/{%STATUS%}/g,product.error)
 
   return output;
 
 }