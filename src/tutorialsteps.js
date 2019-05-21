import React from 'react';

const steps = [
        {
          content: <h2>Let's begin our journey!</h2>,
          placement: 'center',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: 'body',
        },
        {
          content: <p>First, lets set how much we want to invest</p>,
          placement: 'bottom',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.notionaltyper',
        },
        {
          content: <p>Here you can adjust the dates to see how the performance would have changed</p>,
          placement: 'bottom',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.datetutorial',
        },
        {
          content: <p>Here we will change the weightings of the three funds we are buying</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.fundslist',
        },
        {
          content: <p>Alternatively you can choose some quick scenarios to model your portfolio</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.quickchanges',
        },
        {
          content: <p>Here you can see the statistics of how the portfolio would have performed</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.statstable',
        },
        {
          content: <p>This is the weighting of each fund in your portfolio</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.tutorialweighting',
        },
        {
          content: <p>This is the amount you've bought in cash</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.tutorialcash',
        },{
          content: <p>This is the price change of the fund in the date period you chose</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.tutorialreturn',
        },
        {
          content: <p>This is the return you would have made in cash (before any fees!)</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.tutorialreturncash',
        },
        {
          content: <p>The standard deviation is a measure of how much these funds can move up or down in a year.</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.tutorialSD',
        },
        {
          content: <p>This represents the largest loss you would have made in that time period</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.drawdown',
        },
        {
          content: <p>Next lets model what the cost would have been to buy this portfolio on various platforms</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.tutorialplatforms',
        },
        {
          content: <p>Adjust which platform you use and see how the modelled costs would have changed!</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.platformchoice',
        },
        {
          content: <p>Here you can see the individual costs per paltform</p>,
          placement: 'top',
          locale: { skip: <strong aria-label="skip">Skip</strong> },
          target: '.platformfeedetail',
        }]


export function StepsFunction(){
  return steps
}

