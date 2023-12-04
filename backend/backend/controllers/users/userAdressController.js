import Address from '../../models/users/addressModel'

const addAddress = async (req, res) => {
   const {name, addressLine, phone} = req?.body;
    try {
        const newAddress = new Address({
            name,
            addressLine,
            phone
        
        });
        
        console.log(newAddress);
        res.json({ message: 'Address created successfully', status:200, address:newAddress })
    } catch (error) {
        res.json({ message: 'Internal Server Error', status:500 })
        console.log(error.message);
    }
}

export default addAddress;