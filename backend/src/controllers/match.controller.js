const Match = require('../models/match.model');

const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find()
      .populate('fighters', 'name gender weight belt')
      .populate('tournamentId', 'name year month')
      .sort({ createdAt: 1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addMatch = async (req, res) => {
  try {
    const { tournamentId, fighters } = req.body;

    if (!fighters || fighters.length !== 2) {
      return res.status(400).json({ message: 'Cần chọn đúng 2 võ sinh cho 1 cặp đấu.' });
    }

    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateResult = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Không tìm thấy trận đấu.' });

    const { winner } = req.body;
    if (!['Đỏ', 'Xanh'].includes(winner)) {
      return res.status(400).json({ message: 'Winner phải là "Đỏ" hoặc "Xanh".' });
    }

    match.result = { winner };
    await match.save();

    res.json({ message: 'Cập nhật kết quả thành công', match });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Không tìm thấy trận đấu.' });

    await match.deleteOne();

    res.json({ message: 'Xóa trận đấu thành công', matchId: match._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllMatches,
  addMatch,
  updateResult,
  deleteMatch,
};
