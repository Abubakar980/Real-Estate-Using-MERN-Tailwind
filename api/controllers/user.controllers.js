export const test = async (req, res) => {
    try {
        res.send("Hello world");
    } catch (error) {
        console.log(error);
        
    }
};
