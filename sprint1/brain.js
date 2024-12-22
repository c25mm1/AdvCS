<!DOCTYPE html>
<html>
<script src="//unpkg.com/brain.js"></script>
<body>
<h1>Deep Learning with brain.js</h1>
<div id="demo"></div>

<script>
  const brain = require('brain.js');
const net = new brain.NeuralNetwork({
    hiddenLayers: [10, 10],
    activation: 'sigmoid'
  });
{
    hiddenLayers: [3];
    activation:'sigmoid';
    learningRate: 0.3;
}  
const data = [
    { input: 'Who won the world cup?', output: { sports: 1 } },
    { input: 'What is the capital of India?', output: { politics: 1 } },
    { input: 'Who is the lead singer of Coldplay?', output: { entertainment: 1 } },
    { input: 'What is the speed of light?', output: { science: 1 } },
    { input: 'How many goals did Messi score?', output: { sports: 1 } },
    { input: 'Who is the president of USA?', output: { politics: 1 } },
    { input: 'What is the latest movie of Tom Cruise?', output: { entertainment: 1 } },
    { input: 'What is the formula of water?', output: { science: 1 } }
  ];
  net.train(data, {
    iterations: 10000,
    errorThresh: 0.01,
    log: true,
    logPeriod: 100
  });

  const output = net.run('Who is the prime minister of UK?');
console.log(output);
</script>
