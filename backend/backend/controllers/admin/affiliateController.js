import Affiliate from '../../models/admin/affiliateModel'

function generateReferralCode() {
    const companyPrefix = 'pr'
    const characters = '12345678';
    const codeLength = 6;
    let referralCode = `${companyPrefix}''`;
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      referralCode += characters.charAt(randomIndex);
    }
    return referralCode;
  }
 
const addAffiliate = async(req, res) => {
    try {
        const existingAffiliate = await Affiliate.findOne({user_id:req?.user?.id});
        if(existingAffiliate) {
            return res.json({message:'Affiliate already exists', status:400})
        }
        // Creating a new affiliate
        const newAffiliate = await Affiliate.create({
            user_id:req?.user?.id,
            referral_Code:generateReferralCode()
        });
        return res.json({message:'User registered as an affiliate', referral_Code:newAffiliate.referral_Code})
    } catch (error) {
        res.json({message:'Internal Server Error',status:500});
        console.log('Could not register as an affiliate', error.message);
    }
}

export default addAffiliate;