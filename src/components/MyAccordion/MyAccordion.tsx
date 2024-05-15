import { ArrowRight } from '@mui/icons-material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';

interface MyAccordionProps {
	title: string;
	children: React.ReactNode;
}

const MyAccordion: React.FC<MyAccordionProps> = (props) => {
	const { title, children } = props;

	// open projects panal by default
	const [expanded, setExpanded] = useState<string | false>('Starred');

	const Accordion = styled((props: AccordionProps) => (
		<MuiAccordion disableGutters elevation={0} square {...props} />
	))(() => ({
		border: 'none',
		'&:before': {
			display: 'none',
		},
	}));

	const AccordionSummary = styled((props: AccordionSummaryProps) => (
		<MuiAccordionSummary expandIcon={<ArrowRight sx={{ fontSize: '1.5rem' }} />} {...props} />
	))(({ theme }) => ({
		backgroundColor: 'transparent',
		padding: 0,
		flexDirection: 'row-reverse',
		'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
			transform: 'rotate(90deg)',
		},
		'& .MuiAccordionSummary-content': {
			marginLeft: theme.spacing(1),
		},
	}));

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<Accordion expanded={expanded === title} onChange={handleChange(title)}>
			<AccordionSummary>
				<h5>{title}</h5>
			</AccordionSummary>
			{children}
		</Accordion>
	);
};

export default MyAccordion;
