const Preview = async function (req, res) {
  // Check the token and source uid
  if (req.query?.token === null) {
    return res.status(401).json({ message: 'No preview token' });
  }
  if (req.query?.uri === null) {
    return res.status(401).json({ message: 'No URI provided' });
  }

  res.setPreviewData(
    {
      token: req.query.token ?? null,
    },
    {
      maxAge: 60,
    }
  );

  let uri = req.query.uri === 'homepage' ? '' : req.query.uri;

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.redirect('/' + uri);
};

export default Preview;
