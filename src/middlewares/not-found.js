const notFound = (_, res) => {
    res.status(404).send({
        status: 'notFound',
        message: "Sorry, I didn't find what you were looking for."
    });
};

export default notFound;
