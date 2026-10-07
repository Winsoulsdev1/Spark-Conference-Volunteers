// Free registration path for secondary school students.
// No Paystack involved at all — just records the registration and emails Winner.
 
module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }
 
  try {
    var body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    }
    var formData = (body && body.formData) || {};
 
    if (!formData.name || !formData.email) {
      res.status(400).json({ success: false, message: 'Missing required fields' });
      return;
    }
 
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'f9ef1bc9-b9b5-4a80-8889-1c66aaa8867f',
        subject: 'New Spark Conference attendee — FREE (Secondary School)',
        'Full Name': formData.name || '',
        'Email': formData.email || '',
        'Phone (WhatsApp)': formData.phone || '',
        'School': formData.school || '',
        'Level of Study': formData.level || '',
        'How they heard about Spark': formData.heard || '',
        'Expectations': formData.expectations || '',
        'Ticket Type': 'FREE — Secondary School'
      })
    });
 
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error while registering' });
  }
};
 
