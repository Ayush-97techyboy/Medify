import React, { useState } from 'react';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import faqsImage from '../../assets/faqs.png';

const faqs = [
  {
    question: 'Why choose our medical for your family?',
    answer: 'We provide personalized care tailored to your family\'s needs with experienced professionals.'
  },
  {
    question: 'Why are we different from others?',
    answer: 'Our commitment to quality, accessibility, and patient satisfaction sets us apart.'
  },
  {
    question: 'Trusted & experienced senior care & love',
    answer: 'Our senior care team is highly trained and compassionate, ensuring the best care possible.'
  },
  {
    question: 'How to get appointment for emergency cases?',
    answer: 'You can contact our 24/7 emergency hotline or use our online booking system for urgent appointments.'
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#f0f6ff' }}>
      <Container maxWidth="lg" sx={{ display: { xs: 'block', md: 'flex' }, alignItems: 'flex-start' }}>
        <Box component="img" src={faqsImage} alt="FAQ Icon" sx={{ width: { xs: '100%', md: 275 }, height: { xs: 'auto', md: 250 }, mb: { xs: 4, md: 0 }, mr: { md: 4 } }} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography sx={{ fontWeight: 600 }}>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
