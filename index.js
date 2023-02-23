const express = require('express')
const app = express()
const port = 3000

// This is not needed. Only to display that the policy is running.
app.get('/', (req, res) => {
  res.send('External policy running')
})

app.get('/policy/v1/service/configuration', (req, res) => {
  
  const alias = req.query.local_alias

  if (alias?.match(/^my-vmr-/)) {
    // In this case we accept all the VMR that start by "my-vmr-", but we can
    // add other kind of logic:
    //   - Check if the alias was previously populated in the database (useful
    //     for a scheduling use case).
    //   - Only allow calls in working hours.
    //   - Only allow calls that come from know IPs.
  
    res.status(200).json({
      status: 'success',
      action: 'continue',
      result: {
        service_type: 'conference',
        name: alias,
        service_tag: 'my-service',
        description: '',
        call_tag: '',
        pin: '2931', // Host PIN
        guest_pin: '',
        guests_can_present: true,
        allow_guests: true,
        view: 'five_mains_seven_pips', // We choose the layout
        locked: false
      },
    })

  } else {
    res.status(404).json({
      status: 'fail',
      action: 'continue',
      result: {},
    })
  }
})

app.listen(port, () => {
  console.log(`Example external policy server listening on port ${port}`)
})

