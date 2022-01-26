const jwt=require("jsonwebtoken")


module.exports.home=async(req,res)=>{
    const name= await req.cookies.name
    const id=await req.cookies.Id
    res.status(200).json({success:"true",description:"send mainpage of user"})
}

module.exports.generatePass=async(req,res)=>{
    var NoAlphaS=req.body.NoAlphaS
    var NoAlphaL=req.body.NoAlphaL
    var NoNum=req.body.NoNum
    var NoSpecialCh=req.body.NoSpecialCh
    const AlphaS=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
    const AlphaL=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    const SpecialCh=["@","@","#","$","%","^","&","*","?"]
    const length=(NoAlphaL+NoAlphaS+NoSpecialCh+NoNum)
    var Pass=""
    while(Pass.length<length){
        if (0<NoAlphaS){
            var randomnumber = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
            Pass=Pass+AlphaS[randomnumber]
            NoAlphaS-=1  
        }
        if (Pass.length>=length) break

        if (0<NoAlphaL){
            var randomnumber = Math.floor(Math.random() * (25 - 0 + 1)) + 0;
            Pass=Pass+AlphaL[randomnumber]
            NoAlphaL-=1  
        }
        if (Pass.length>=length) break
        if (0<NoSpecialCh){
            var randomnumber = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
            Pass=Pass+SpecialCh[randomnumber]
            NoSpecialCh-=1  
        }
        if (Pass.length>=length) break
        if (0<NoNum){
            var randomnumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            Pass=Pass+randomnumber
            NoNum-=1  
        }

    }
    res.status(200).json({success:"true",desciption:"send mainPage with password generated",result:Pass})
}