/**
 * NewReporterController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const secret='secretkey';
const salt = bcrypt.genSaltSync(10);
module.exports = {
   
    createReporter:async function(req,res)
    {
        let reporter=req.body;
       
        let hash = bcrypt.hashSync(reporter.password, salt);
        reporter.password=hash;
        console.log(reporter);
        await NewReporter.create(reporter).exec(function(err,created){
            if(err) return res.send(err);
            return res.send(created);
            
          });
        
       
    },
    findUser:async function(req,res)
    {
      
        let data=req.body;
        console.log(data.email);
        let user=await NewReporter.find({email:data.email});
        console.log(user)

        
          let setUser={
            id:user[0].id,
            city:user[0].city,
            email:user[0].email,
            permission:user[0].permission,
            role:user[0].role
        }
       
       
       console.log(bcrypt.compareSync(user[0].password, data.password))
        if(await bcrypt.compareSync(data.password, user[0].password))
        {
           

            
            console.log(setUser)
            const token = jwt.sign(setUser, secret, {
                algorithm: "HS256"
                
            })
            if(user[0].role=='admin')
            {
                res.send({msg:"admin login successfull",token:token,user:setUser})

            }
            else{
                console.log("token:", token)
                if(user[0].permission===true)
                {
                    console.log(user[0].permission);
                    res.send({msg:'reporter login successful',token:token,role:user[0].role});
    
                }
                else{
                    res.send({per:'permission denied'});
                }

            }
           

        }
        else{
            
            res.send({msg:'wrong password'});
        }
        
       
        
    },

    getUser:async function(req,res)
    {
        let users=await NewReporter.find({permission:false});
        if(users===null)
        {
            res.send({msg:'no user found'});
        }
        else{
            res.send({users:users});
        }
    },
    // await User.update({ name:'Pen' })
    // .set({
    //   name:'Finn'
    // });
    setPermission:async function(req,res)
    {
        const {email}=req.body;
        console.log(email)
        await NewReporter.updateOne({email:email}).set({permission:true})
      res.ok();
    },

   
  

};

