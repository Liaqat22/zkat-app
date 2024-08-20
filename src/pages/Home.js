import { Box, Button, Modal, TextField } from '@mui/material';
import { Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import Table from './Table';

function Home() {
  const [totalincome, setTotalIncome] = useState(0);
  const [zakatvalue, setZakat] = useState(0);
  const [remainingZkat, setRemainingZkat] = useState(0);
  const [formData, setFormData] = useState({ name: '', amount: '' });
  const [allneedy, setAllNeedy] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleform = () => {
    const zValue = totalincome / 40;
    setZakat(zValue);
  };

  useEffect(() => {
    const income = localStorage.getItem('income');
    const incomeparse = JSON.parse(income) || 0;
    setTotalIncome(incomeparse);

    const zakat = localStorage.getItem('zkat');
    const zakatparse = JSON.parse(zakat) || 0;
    setZakat(zakatparse);

    const needy = localStorage.getItem('needy');
    const needyParse = JSON.parse(needy) || [];
    setAllNeedy(needyParse);

    const remainingzkat = localStorage.getItem('remainingzkat');
    const remainingzkatParse = JSON.parse(remainingzkat) || 0;
    setRemainingZkat(remainingzkatParse);
  }, []);

  const Total = useMemo(() => {
    const f = allneedy.filter((f) => f.amount > 0).map((m) => parseFloat(m.amount));
    let total = 0;
    f.forEach((t) => (total += t));
    return total;
  }, [allneedy]);

  useEffect(() => {
    localStorage.setItem('income', JSON.stringify(totalincome));
    localStorage.setItem('zkat', JSON.stringify(zakatvalue));
    localStorage.setItem('needy', JSON.stringify(allneedy));
    const newRemainingZkat = zakatvalue - Total;
    localStorage.setItem('remainingzkat', JSON.stringify(newRemainingZkat));
    setRemainingZkat(newRemainingZkat);
  }, [zakatvalue, totalincome, allneedy, Total]);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 335,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAllNeedy([...allneedy, formData]);
    setFormData({ name: '', amount: '' });
    setOpen(false);
  };

  const handleDelete = (name) => {
    const newNeedy = allneedy.filter((needy) => needy.name !== name);
    setAllNeedy(newNeedy);
  };

  return (
    <>
      <div className='container'>
        <div className='row mainrow '>
          <TextField id='standard-basic' label='Enter Total Income' type='number' onChange={(e) => setTotalIncome(e.target.value)} />
          <Button sx={{ background: 'lightblue' }} onClick={handleform} className='submitbtn mt-3 mb-3'>
            submit
          </Button>
          <div className='col-md-3'>
            <Typography>
              Total income : <b > {totalincome}</b>
            </Typography>
          </div>
          <div className='col-md-3'>
            <Typography>
              Total Zakat :<b > {zakatvalue}</b>
            </Typography>
          </div>
          <div className='col-md-3'>
            <Typography>
              Remaining Zakat :<b > {remainingZkat}</b>
            </Typography>
          </div>

          <div className='col-md-3 '>
            <button className='btn btn-primary' onClick={() => setOpen(true)}>
              add needy
            </button>
          </div>

          <Modal open={open} onClose={handleClose}>
            <Box sx={style} borderRadius='1rem'>
              <form onSubmit={handleSubmit} className='p-3 bg-light'>
                <TextField label='Name' name='name' value={formData.name} onChange={handleChange} fullWidth margin='normal' required />

                <TextField
                  label={remainingZkat <= 0 ? 'no more amount left' : `amount left ${remainingZkat}`}
                  name='amount'
                  value={formData.amount}
                  onChange={handleChange}
                  type='number'
                  fullWidth
                  margin='normal'
                  required
                  disabled={remainingZkat <= 0}
                  inputProps={{
                    max: remainingZkat,
                  }}
                />
                <Button type='submit' variant='contained' color='primary' fullWidth sx={{ mt: 3 }} disabled={remainingZkat <= 0}>
                  Submit
                </Button>
              </form>
            </Box>
          </Modal>

          <div className='col-md-11 mt-3 mb-3'>
            <Typography className='text-center mb-3'>
              <b>Zakat Delivered to :</b>
            </Typography>
            <Table needyData={allneedy} onDelete={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
