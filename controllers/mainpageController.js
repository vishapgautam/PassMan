const jwt=require("jsonwebtoken")


module.exports.home=async(req,res)=>{
    const name= await req.cookies.name
    const id=await req.cookies.Id
    res.status(200).render('notify',{response:"Your Accound Created successfuly",message1:"Your accound is created successfully.Now you can go back to get your passwords[if you have save any]  by clicking back.",message2:"If you want to go back to main page click mainpage below.",button1:"Back",button2:"Main Page"})
}

module.exports.generatePass=async(req,res)=>{
    var NoAlphaS=req.body.NoAlphaS|3
    var NoAlphaL=req.body.NoAlphaL|3
    var NoNum=req.body.NoNum|3
    var NoSpecialCh=req.body.NoSpecialCh|3
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
    res.status(200).render('generatedPass',{password:Pass})
}