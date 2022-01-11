const stayService = require('./stay.service.js');
const logger = require('../../services/logger.service')

// GET LIST
async function getStays(req, res) {
  try {
    var queryParams = req.query;
    const stays = await stayService.query(queryParams)
    res.json(stays);
  } catch (err) {
    logger.error('Failed to get stays', err)
    res.status(500).send({ err: 'Failed to get stays' })
  }
}
async function getLabels(req, res) {
  try {
    const labels = await stayService.labelQuery()
    res.json(labels);
  } catch (err) {
    logger.error('Failed to get labels', err)
    res.status(500).send({ err: 'Failed to get labels' })
  }
}

// GET BY ID 
async function getStayById(req, res) {
  try {
    // console.log('controller ');
    const stayId = req.params.id;
    const stay = await stayService.getById(stayId);
    // console.log(stay);
    res.json(stay)
  } catch (err) {

    logger.error('Failed to get stay', err)
    res.status(500).send({ err: 'Failed to get stay' })
  }
}

// POST (add stay)
async function addStay(req, res) {
  try {
    const stay = req.body;
    const addedStay = await stayService.add(stay)
    res.json(addedStay)
  } catch (err) {
    logger.error('Failed to add stay', err)
    res.status(500).send({ err: 'Failed to add stay' })
  }
}
async function addReview(req,res){
  try {
    const stay= await stayService.getById(req.params.stayId)
    stay.reviews.unshift(req.body)
    const updatedStay = await stayService.update(stay)
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to add review', err)
    res.status(500).send({ err: 'Failed to add reveiw' })
  }

}
// PUT (Update stay)
async function updateStay(req, res) {
  // console.log('heyush');
  try {
    const stay = req.body;
    // console.log('stay before update',stay);
    const updatedStay = await stayService.update(stay)
    // console.log('stay after update', updatedStay);
    res.json(updatedStay)
  } catch (err) {
    logger.error('Failed to update stay', err)
    res.status(500).send({ err: 'Failed to update stay' })

  }
}

// DELETE (Remove stay)
async function removeStay(req, res) {
  try {
    const stayId = req.params.id;
    const removedId = await stayService.remove(stayId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove stay', err)
    res.status(500).send({ err: 'Failed to remove stay' })
  }
}

module.exports = {
  getStays,
  getStayById,
  addStay,
  updateStay,
  removeStay,
  getLabels,
  addReview,
}
