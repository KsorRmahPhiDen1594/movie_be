const userSchema = require("../../models/userSchema");
const bcrypt=require('bcrypt');

const dashboard = async (req, res) =>{
    try{

        // user search 
        const userSearch = req.query.search || '';
        const userDetails = await userSchema.find({ name: { $regex: userSearch, $options: 'i'}})

        if (userDetails.length ===0 ){
            req.flash('errorMessager', 'No user registration details is availabe')
        }

        res.render('admin/dashboard', {title: "Dashboard", alerMessage: req.flash('errorMessage'), userDetails })
    } catch (err){
        console.log(`Error rendering dashboard &{err}`)
    }
}


const editUserPort = async (req, res) => {
    try{
        const userID = req.params.id;
        const updateStatus = await userSchema.findByIdAndUpdate(userID, { name: req.body.editName })
        if (updateStatus === undefined){
            req.flash("errorMessage", 'User data not updated please try again')
            return res.redirect('/admin/dashboard')
        } 
        req.flash("errorMessage", 'User data updated')
        res.redirect('/admin/dashboard')
    } catch (err){
        console.log(`Error during user data updation ${err}`);
    }
}

