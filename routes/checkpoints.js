const express = require('express')
const router = express.Router()
const User = require('../models/user')
const fetch = require("cross-fetch")
require('dotenv').config()

// Get User
router.get('/data', (req, res) => {

    data = {
        UpperEastSide: [
          { name: "1", longitude: -73.9556746, latitude: 40.7878351 },
          { name: "2", longitude: -73.9729695, latitude: 40.7642737 },
          { name: "3", longitude: -73.9590006, latitude: 40.7583415 },
          { name: "4", longitude: -73.9586572, latitude: 40.7588453 },
          { name: "5", longitude: -73.9557175, latitude: 40.7613158 },
          { name: "6", longitude: -73.9461689, latitude: 40.7716193 },
          { name: "7", longitude: -73.9437442, latitude: 40.7738781 },
          { name: "8", longitude: -73.9424996, latitude: 40.7761042 },
          { name: "9", longitude: -73.9445381, latitude: 40.7819049 },
          { name: "10", longitude: -73.9440231, latitude: 40.7829448 },
          { name: "11", longitude: -73.9556746, latitude: 40.7878351 },
        ],
    
        UpperWestSide: [
          { name: "1", longitude: -73.9583754, latitude: 40.8006356 },
          { name: "2", longitude: -73.9709757, latitude: 40.8059518 },
          { name: "3", longitude: -73.9936994, latitude: 40.773005 },
          { name: "4", longitude: -73.9818548, latitude: 40.7680649 },
          { name: "5", longitude: -73.9583754, latitude: 40.8006356 },
        ],
        MidtownWest: [
          { name: "1", longitude: -73.9729695, latitude: 40.7642737 },
          { name: "2", longitude: -73.9936994, latitude: 40.773005 },
          { name: "3", longitude: -73.9949266, latitude: 40.7712232 },
          { name: "4", longitude: -73.9951412, latitude: 40.7695981 },
          { name: "5", longitude: -74.0000765, latitude: 40.763195 },
          { name: "6", longitude: -74.0017931, latitude: 40.7618623 },
          { name: "7", longitude: -74.0051405, latitude: 40.7571489 },
          { name: "8", longitude: -73.9845411, latitude: 40.7484037 },
          { name: "9", longitude: -73.9729695, latitude: 40.7642737 },
        ],
        MidtownEast: [
          { name: "1", longitude: -73.9729695, latitude: 40.7642737 },
          { name: "1", longitude: -73.9845411, latitude: 40.7484037 },
          { name: "1", longitude: -73.9720685, latitude: 40.7432053 },
          { name: "1", longitude: -73.9623696, latitude: 40.7547794 },
          { name: "1", longitude: -73.9610392, latitude: 40.7556572 },
          { name: "1", longitude: -73.9590006, latitude: 40.7583415 },
          { name: "1", longitude: -73.9729695, latitude: 40.7642737 },
        ],
        Chelsea: [
          { name: "1", longitude: -73.9878066, latitude: 40.7497359 },
          { name: "1", longitude: -74.0051405, latitude: 40.7571489 },
          { name: "1", longitude: -74.0072902, latitude: 40.7541898 },
          { name: "1", longitude: -74.0085776, latitude: 40.7500285 },
          { name: "1", longitude: -74.0078481, latitude: 40.7483379 },
          { name: "1", longitude: -74.0087493, latitude: 40.7423229 },
          { name: "1", longitude: -73.9968188, latitude: 40.7373154 },
          { name: "1", longitude: -73.9878066, latitude: 40.7497359 },
        ],
        Gramercy: [
          { name: "1", longitude: -73.9878066, latitude: 40.7497359 },
          { name: "1", longitude: -73.9968188, latitude: 40.7373154 },
          { name: "1", longitude: -73.9719875, latitude: 40.7268028 },
          { name: "1", longitude: -73.9718159, latitude: 40.7293721 },
          { name: "1", longitude: -73.9739187, latitude: 40.7310632 },
          { name: "1", longitude: -73.9750774, latitude: 40.7365914 },
          { name: "1", longitude: -73.9730604, latitude: 40.7394204 },
          { name: "1", longitude: -73.9720685, latitude: 40.7432053 },
          { name: "1", longitude: -73.9878066, latitude: 40.7497359 },
        ],
        GreenwichVillage: [
          { name: "1", longitude: -73.9968188, latitude: 40.7373154 },
          { name: "1", longitude: -74.0087493, latitude: 40.7423229 },
          { name: "1", longitude: -74.0094719, latitude: 40.7405363 },
          { name: "1", longitude: -74.0102014, latitude: 40.7392682 },
          { name: "1", longitude: -74.0100941, latitude: 40.7376261 },
          { name: "1", longitude: -74.0108452, latitude: 40.7291223 },
          { name: "1", longitude: -74.0028198, latitude: 40.7283907 },
          { name: "1", longitude: -73.9968118, latitude: 40.7254148 },
          { name: "1", longitude: -73.9915118, latitude: 40.7317077 },
          { name: "1", longitude: -73.9907963, latitude: 40.7347392 },
          { name: "1", longitude: -73.9968188, latitude: 40.7373154 },
        ],
        EastVillage: [
          { name: "1", longitude: -73.9719875, latitude: 40.7268028 },
          { name: "1", longitude: -73.9907963, latitude: 40.7347392 },
          { name: "1", longitude: -73.9915118, latitude: 40.7317077 },
          { name: "1", longitude: -73.9923788, latitude: 40.730572 },
          { name: "1", longitude: -73.9899005, latitude: 40.7295638 },
          { name: "1", longitude: -73.991596, latitude: 40.7272272 },
          { name: "1", longitude: -73.9925186, latitude: 40.7241212 },
          { name: "1", longitude: -73.9787214, latitude: 40.719893 },
          { name: "1", longitude: -73.9772193, latitude: 40.7193075 },
          { name: "1", longitude: -73.9738075, latitude: 40.7184131 },
          { name: "1", longitude: -73.9726917, latitude: 40.7220234 },
          { name: "1", longitude: -73.9719875, latitude: 40.7268028 },
        ],
        Noho: [
          { name: "1", longitude: -73.9968118, latitude: 40.7254148 },
          { name: "1", longitude: -73.9925186, latitude: 40.7241212 },
          { name: "1", longitude: -73.991596, latitude: 40.7272272 },
          { name: "1", longitude: -73.9899005, latitude: 40.7295638 },
          { name: "1", longitude: -73.9923788, latitude: 40.730572 },
          { name: "1", longitude: -73.9968118, latitude: 40.7254148 },
        ],
        Tribeca: [
          { name: "1", longitude: -74.0112166, latitude: 40.7258884 },
          { name: "1", longitude: -74.0131263, latitude: 40.7172693 },
          { name: "1", longitude: -74.0063243, latitude: 40.7141791 },
          { name: "1", longitude: -74.0018182, latitude: 40.7193348 },
          { name: "1", longitude: -74.0112166, latitude: 40.7258884 },
        ],
        Soho: [
          { name: "1", longitude: -74.0028084, latitude: 40.7282822 },
          { name: "1", longitude: -74.0108452, latitude: 40.7291223 },
          { name: "1", longitude: -74.0112166, latitude: 40.7258884 },
          { name: "1", longitude: -74.0054906, latitude: 40.7219402 },
          { name: "1", longitude: -74.0012205, latitude: 40.7189478 },
          { name: "1", longitude: -73.9958561, latitude: 40.7251275 },
          { name: "1", longitude: -73.9968118, latitude: 40.7254148 },
          { name: "1", longitude: -74.0028084, latitude: 40.7282822 },
        ],
        LowerEastSide: [
          { name: "1", longitude: -73.9737217, latitude: 40.7184131 },
          { name: "1", longitude: -73.9771335, latitude: 40.7193075 },
          { name: "1", longitude: -73.9786356, latitude: 40.719893 },
          { name: "1", longitude: -73.9924328, latitude: 40.7241212 },
          { name: "1", longitude: -73.9953324, latitude: 40.7158546 },
          { name: "1", longitude: -73.9917919, latitude: 40.7095764 },
          { name: "1", longitude: -73.9786598, latitude: 40.7111216 },
          { name: "1", longitude: -73.9761493, latitude: 40.7147161 },
          { name: "1", longitude: -73.9737217, latitude: 40.7184131 },
        ],
        Nolita: [
          { name: "1", longitude: -73.9958561, latitude: 40.7251275 },
          { name: "1", longitude: -73.9998693, latitude: 40.7204619 },
          { name: "1", longitude: -73.9980936, latitude: 40.7195716 },
          { name: "1", longitude: -73.99458, latitude: 40.7183396 },
          { name: "1", longitude: -73.9925186, latitude: 40.7241212 },
          { name: "1", longitude: -73.9958561, latitude: 40.7251275 },
        ],
        Chinatown: [
          { name: "1", longitude: -73.9938698, latitude: 40.7130908 },
          { name: "1", longitude: -73.9954182, latitude: 40.7158546 },
          { name: "1", longitude: -73.99458, latitude: 40.7183396 },
          { name: "1", longitude: -73.9980936, latitude: 40.7195716 },
          { name: "1", longitude: -73.9998693, latitude: 40.7204619 },
          { name: "1", longitude: -74.0012205, latitude: 40.7189478 },
          { name: "1", longitude: -74.0018182, latitude: 40.7193348 },
          { name: "1", longitude: -74.0044484, latitude: 40.7162461 },
          { name: "1", longitude: -73.9986549, latitude: 40.71353 },
          { name: "1", longitude: -73.9979468, latitude: 40.7127249 },
          { name: "1", longitude: -73.9938698, latitude: 40.7130908 },
        ],
        FinancialDistrict: [
          { name: "1", longitude: -73.999432, latitude: 40.7079947 },
          { name: "1", longitude: -73.997511, latitude: 40.7087287 },
          { name: "1", longitude: -73.9918777, latitude: 40.7095764 },
          { name: "1", longitude: -73.9938698, latitude: 40.7130908 },
          { name: "1", longitude: -73.9979468, latitude: 40.7127249 },
          { name: "1", longitude: -73.9986549, latitude: 40.71353 },
          { name: "1", longitude: -74.0044484, latitude: 40.7162461 },
          { name: "1", longitude: -74.0063243, latitude: 40.7141791 },
          { name: "1", longitude: -74.0131263, latitude: 40.7172693 },
          { name: "1", longitude: -74.01692, latitude: 40.7048878 },
          { name: "1", longitude: -74.0144094, latitude: 40.7045788 },
          { name: "1", longitude: -74.0144524, latitude: 40.7031473 },
          { name: "1", longitude: -74.0137872, latitude: 40.7023177 },
          { name: "1", longitude: -74.012843, latitude: 40.7023014 },
          { name: "1", longitude: -74.0124353, latitude: 40.7012928 },
          { name: "1", longitude: -74.0090665, latitude: 40.7019273 },
          { name: "1", longitude: -73.999432, latitude: 40.7079947 },
        ],
        BatteryPark: [
          { name: "1", longitude: -74.0129536, latitude: 40.7182644 },
          { name: "1", longitude: -74.0166443, latitude: 40.7186222 },
          { name: "1", longitude: -74.0175455, latitude: 40.7135479 },
          { name: "1", longitude: -74.0163439, latitude: 40.7133202 },
          { name: "1", longitude: -74.0166443, latitude: 40.7122142 },
          { name: "1", longitude: -74.0177601, latitude: 40.7123443 },
          { name: "1", longitude: -74.0187901, latitude: 40.7078551 },
          { name: "1", longitude: -74.0181034, latitude: 40.7076924 },
          { name: "1", longitude: -74.0185326, latitude: 40.7068791 },
          { name: "1", longitude: -74.0191763, latitude: 40.7068791 },
          { name: "1", longitude: -74.0193909, latitude: 40.7060007 },
          { name: "1", longitude: -74.0184896, latitude: 40.7040487 },
          { name: "1", longitude: -74.0151852, latitude: 40.7008278 },
          { name: "1", longitude: -74.0132111, latitude: 40.7004049 },
          { name: "1", longitude: -74.0111082, latitude: 40.7008604 },
          { name: "1", longitude: -74.011194, latitude: 40.7014785 },
          { name: "1", longitude: -74.0124353, latitude: 40.7012928 },
          { name: "1", longitude: -74.012843, latitude: 40.7023014 },
          { name: "1", longitude: -74.0137872, latitude: 40.7023177 },
          { name: "1", longitude: -74.0144524, latitude: 40.7031473 },
          { name: "1", longitude: -74.0144094, latitude: 40.7045788 },
          { name: "1", longitude: -74.01692, latitude: 40.7048878 },
          { name: "1", longitude: -74.0129536, latitude: 40.7182644 },
        ],
    
        "ClassicRoute": [
          {
              "name": "Central Park",
              "longitude": -73.9665138,
              "latitude": 40.7812199,
              "place_id": "ChIJ4zGFAZpYwokRGUGph3Mf37k"
          },
          {
              "name": "Rockefeller Center",
              "longitude": -73.9786736,
              "latitude": 40.7587402,
              "place_id":"ChIJ9U1mz_5YwokRosza1aAk0jM"
          },
          {
              "name": "The Metropolitan Museum of Art",
              "longitude": -73.963244,
              "latitude": 40.7794366,
              "place_id":"ChIJb8Jg9pZYwokR-qHGtvSkLzs"
          },
          {
              "name": "Theater District",
              "longitude": -73.9844722,
              "latitude": 40.759011,
              "place_id":"ChIJgzD7uFVYwokRXCoEdvGu-aA"
          },
          {
              "name": "Empire State Building",
              "longitude": -73.98566439999999,
              "latitude": 40.7484405,
              "place_id":"ChIJaXQRs6lZwokRY6EFpJnhNNE"
          },
          {
              "name": "9/11 Memorial Pools",
              "longitude": -74.0124786,
              "latitude": 40.7114147,
              "place_id":"ChIJuywwGBpawokRCb31xeHV66I"
          },
          {
              "name": "The High Line",
              "longitude": -74.0047649,
              "latitude": 40.7479925,
              "place_id": "ChIJ5bQPhMdZwokRkTwKhVxhP1g"
          },
          {
              "name": "American Museum of Natural History",
              "longitude": -73.9739882,
              "latitude": 40.78132409999999,
              "place_id":"ChIJCXoPsPRYwokRsV1MYnKBfaI"
          },
          {
              "name": "Times Square",
              "longitude": -73.9855426,
              "latitude": 40.7579747,
              "place_id":"ChIJmQJIxlVYwokRLgeuocVOGVU"
          },
          {
              "name": "Grand Central Terminal",
              "longitude": -73.97683239999999,
              "latitude": 40.7529456,
              "place_id": "ChIJ-b2RmVlZwokRpb1pwEQjss0"
          },
          {
              "name": "Lincoln Center for the Performing Arts",
              "longitude": -73.9834889,
              "latitude": 40.7724641,
              "place_id": "ChIJN6W-X_VYwokRTqwcBnTw1Uk"
          },
          {
              "name": "One World Observatory",
              "longitude": -74.013173,
              "latitude": 40.7130062,
              "place_id":"ChIJTWE_0BtawokRVJNGH5RS448"
          },
          {
              "name": "New York Public Library",
              "longitude": -73.9822534,
              "latitude": 40.75318230000001,
              "place_id": "ChIJPS8b1vhYwokRldqq2YHmxJI"
  
          },
          {
              "name": "Radio City Music Hall",
              "longitude": -73.9799772,
              "latitude": 40.75997599999999,
              "place_id": "ChIJPS8b1vhYwokRldqq2YHmxJI"
          },
          {
              "name": "St. Patricks Cathedral",
              "longitude": -73.9761953,
              "latitude": 40.7586117,
              "place_id": "ChIJUW4vEPxYwokRW6o24DU0YIg"
          },
          {
              "name": "Carnegie Hall",
              "longitude": -73.97992359999999,
              "latitude": 40.7651258,
              "place_id": "ChIJ2RFUePdYwokRd5R6XF6xFD0"
          },
          {
              "name": "Statue of Liberty Viewpoint",
              "longitude": -74.0151612,
              "latitude": 40.70092359999999,
              "place_id": "ChIJm9tkjRJawokR1LRAe3Sh-6w"
          }
      ],
      "PopCultureRoute": [
          {
              "name": "Bubba Gump Shrimp Co.",
              "longitude": -73.9863737,
              "latitude": 40.7572071,
              "place_id": "ChIJh3tl5lRYwokRzzrdicL9JxY"
          },
          {
              "name": "Hard Rock Cafe",
              "longitude": -73.9866112,
              "latitude": 40.7570352,
              "place_id": "ChIJh3tl5lRYwokRtY1QuaZADu0"
          },
          {
              "name": "Planet Hollywood",
              "longitude": -73.9851237,
              "latitude": 40.7579436,
              "place_id": "ChIJf2_0qFVYwokRu7dmhsHUrpo"
          },
          {
              "name": "Madame Tussauds New York",
              "longitude": -73.9888338,
              "latitude": 40.7564269,
              "place_id": "ChIJ8VOfr1RYwokRhil9_pcMKuc"
          },
          {
              "name": "Disney Store",
              "longitude": -73.9848988,
              "latitude": 40.7578396,
              "place_id": "ChIJf2_0qFVYwokRcbTtlS60Vqg"
          },
          {
              "name": "Hershey's Chocolate World",
              "longitude": -73.9843095,
              "latitude": 40.75934109999999,
              "place_id": "ChIJ94ae2FVYwokRkeOWg5EA8aQ"
          },
          {
              "name": "M&M'S World New York",
              "longitude": -73.9843631,
              "latitude": 40.7601775,
              "place_id": "ChIJHfPuClZYwokRP2wzLQjhuEI"
          },
          {
              "name": "NBA Store",
              "longitude": -73.9793828,
              "latitude": 40.7552241,
              "place_id": "ChIJzQRpJf5YwokREQQZxSGUD4E"
          },
          {
              "name": "Nintendo NY",
              "longitude": -73.97944199999999,
              "latitude": 40.7580592,
              "place_id": "ChIJ3RXu5f5YwokRta8Tcg07kwc"
          },
          {
              "name": "The LEGO Store Fifth Avenue",
              "longitude": -73.97714549999999,
              "latitude": 40.7591306,
              "place_id": "ChIJk470xP5YwokRwm7bM8XAKho"
          },
          {
              "name": "Tiffany & Co. - 5th Avenue",
              "longitude": -73.9739144,
              "latitude": 40.7626931,
              "place_id": "ChIJjyX2GqRZwokRT-gdcGoPuSI"
          },
          {
              "name": "Trump Tower",
              "longitude": -73.973794,
              "latitude": 40.7624284,
              "place_id": "ChIJrc9T9fpYwokRdvjYRHT8nI4"
          },
          {
              "name": "Strawberry Fields",
              "longitude": -73.97473149999999,
              "latitude": 40.7756978,
              "place_id": "ChIJlRYp-4xYwokRqtwtQBYVz80"
          },
          {
              "name": "Alice in Wonderland",
              "longitude": -73.9665454,
              "latitude": 40.77503609999999,
              "place_id": "ChIJAzkNnpNYwokRMqg4xyMQuIU"
          }
      ],
      "NatureRoute": [
          {
              "name": "The High Line",
              "longitude": -74.00531889999999,
              "latitude": 40.7558131,
              "place_id": "ChIJ5bQPhMdZwokRkTwKhVxhP1g"
          },
          {
              "name": "Bryant Park",
              "longitude": -73.9832326,
              "latitude": 40.7535965,
              "place_id": "ChIJvbGg56pZwokRp_E3JbivnLQ"
          },
          {
              "name": "Hallett Nature Sanctuary",
              "longitude": -73.9750243,
              "latitude": 40.7666397,
              "place_id": "ChIJOdmYHPFYwokRupmHNBEUwxw"
           },
          {
              "name": "Sheep Meadow",
              "longitude": -73.9748418,
              "latitude": 40.7717813,
              "place_id": "ChIJezBcrvNYwokRCGwwAfivN4g"
          },
          {
              "name": "Conservatory Garden",
              "longitude": -73.9524588,
              "latitude": 40.7936928,
              "place_id": "ChIJh70nPBz2wokR7EWPEdNPP9s"
          },
          {
              "name": "The Ramble",
              "longitude": -73.9697174,
              "latitude": 40.77787360000001,
              "place_id": "ChIJ_1f3U5JYwokRH1_PRd1eIrI"
          },
          {
              "name": "Loeb Boathouse",
              "longitude": -73.96876929999999,
              "latitude": 40.7752927,
              "place_id": "ChIJm17AB5pYwokRWLJ6lEtXKOA"
          },
          {
              "name": "Strawberry Fields",
              "longitude": -73.97473149999999,
              "latitude": 40.7756978,
              "place_id": "ChIJlRYp-4xYwokRqtwtQBYVz80"
          },
          {
              "name": "Belvedere Castle",
              "longitude": -73.9690677,
              "latitude": 40.7794302,
              "place_id": "ChIJFXzf4e9YwokRtXgpty_i74g"
          },
          {
              "name": "Central Park Zoo",
              "longitude": -73.9718335,
              "latitude": 40.767778,
              "place_id": "ChIJaWjW_PFYwokRFD8a2YQu12U"
          },
          {
              "name": "Washington Square Park",
              "longitude": -73.997332,
              "latitude": 40.7308838,
              "place_id": "ChIJjX494pBZwokRGH620d9eYfo"
          },
          {
              "name": "Tompkins Square Park",
              "longitude": -73.9817841,
              "latitude": 40.72642949999999,
              "place_id": "ChIJgTDll51ZwokRVjN7KXztwXY"
          }
      ]
  }
  

    res.status(201).json(data)

})

// Get User
router.get('/:id', (req, res) => {

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.id}&key=${process.env.API_KEY}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            res.status(201).json(data)
        });
    try {
        1 + 1
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Create User
router.post('/', async (req, res) => {
    const checkpoint = {
        x: req.body.x,
        y: req.body.y,
        range: req.body.range,
        type: req.body.type

    }
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${checkpoint.x}%2C${checkpoint.y}&radius=${checkpoint.range}&type=${checkpoint.type}&key=${process.env.API_KEY}`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            res.status(201).json(data)
        });
    try {
        1 + 1
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})






module.exports = router