
export function validate (input){
    let errors = {}
    if(!input.name) {
        errors.name = 'Name is required'
    }
    else if(!input.img){
        errors.img = 'Image is required'
    }
    else if(!input.resume){
        errors.resume = 'Resume is required'
    }
    else if(!input.healthScore || input.healthScore > 100 || input.healthScore < 0){
        errors.healthScore = 'Health Score have to be between 0 and 100'
    }
    else if(input.diets.length === 0){
        errors.diets = 'At least one diet is required'
    }
    return errors
}