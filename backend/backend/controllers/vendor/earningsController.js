import Earnings from "../../models/vendor/earningSchema";

const earningsEntry = async (req, res) => {
  try {
    const {
        vendorId,
        orderNumber,
        adminCommission,
        yourEarnings,
        transactionDate,
      } = req.body;
    const newEarnings = new Earnings({
        vendorId,
        orderNumber,
        adminCommission,
        yourEarnings,
        transactionDate,
    });

    await newEarnings.save();
    res.json({message:'Earnings successfully added', status:201, earings:newEarnings})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all earnings

const getAllEarnings = async(req, res) => {
  try {
    const allEarnings = await Earnings.find();
    res.json(allEarnings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get An Earning

const getAnEarning = async(req, res) => {
  const _id = req?.query?.earningId;
  try {
    const singleEarning = await Earnings.findById(_id);
    res.json(singleEarning);

    if(!singleEarning) {
      return res.json({message:'Earning not found', status:404})
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete An Earning

const deleteAnEarning = async(req, res) => {
  const _id = req?.query?.earningId;
  try {
    const deleteEarning = await Earnings.findByIdAndDelete(_id);
    res.json(deleteEarning);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update an Earning

const updateAnEarning = async(req, res) => {
  const _id = req?.query?.earningId;
  try {
    const updatedEarnings = await Earnings.findByIdAndUpdate(_id, req.body, {new:true});
    res.json(updatedEarnings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
    
  }
}

export { earningsEntry, getAllEarnings, getAnEarning , deleteAnEarning, updateAnEarning};
