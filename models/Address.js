var mongoose = require('mongoose');
var AddressSchema = mongoose.Schema({
    firstName: {
        type: String,
      
    },

    Date_become_customer: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
       
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        line3: {
            type: String,
        },
        city: {
            type: String
        },
        zip_or_postcode: {
            type: String
        },
        country: {
            type: String
        }
    },
    address_type: {
        residential: {
            type: String
        },
        work: {
            type: String
        }

    }

});

var Address = module.exports = mongoose.model('Address', AddressSchema);

module.exports.addDetails = function (developer, callback) {
    Address.create(developer, callback);
};

module.exports.getDetails = function (callback, limit) {
    Address.find(callback).limit(limit);
};

module.exports.getDetailsById = function (id, callback) {
    Address.findById(id, callback);
};


module.exports.updateDetails=function(_id,address,options,callback){
    var query={_id: _id};
    var update={
        firstName:address.firstName,
        email:address.email,
        address:{
            line1:address.address.line1,
            line2:address.address.line2,
            line3:address.address.line3,
            city:address.address.city,
            zip_or_postcode:address.address.zip_or_postcode,
            country:address.address.country
        },
        address_type:{
            residential:address.address_type.residential,
            work:address.address_type.work
        }
     
    };
    Address.findOneAndUpdate(query,update,options,callback);
};

module.exports.deleteCustomer=function(id,callback){
    var query={id:id};
    Address.findByIdAndRemove(id,callback);
}