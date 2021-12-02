import { React  , useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ReaderClosed, WindowsExplorer } from '@react95/icons';
import { List , TaskBar , Modal } from '@react95/core';
import  { ThemeProvider as CoreThemeProvider } from '@react95/core';
import {styleReset, Window, WindowHeader , Tabs , Tab , TabBody ,NumberField, Fieldset, WindowContent, Checkbox  , Button , Toolbar } from 'react95';
import './App.css';
import Web3 from 'web3'
import { ChainId, DAppProvider, useEtherBalance, useEthers, Config } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'



// pick a theme of your choice
import original from "react95/dist/themes/original";
// original Windows95 font (optionally)
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";



const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
  ${styleReset}
`;




const App = () => {
  const [state, setState] = useState({
    activeTab: 0,
    stakeTab: 0,
    bondTab: 0,
    bondDaiTab: 0,
    bondDaiLPTab: 0,
    bondUSDCTab: 0

  });
  
  var stakeValue = 0;
  const handleChange = (e, value) => setState({ activeTab: value, stakeTab: 0, bondTab: 0, bondDaiTab: 0, bondDaiLPTab: 0, bondUSDCTab: 0 });
  const handleStake = (e, value) => setState({ activeTab: 1, stakeTab: value });
  const handleBond = (e, value) => setState({ activeTab: 2, stakeTab: null, bondTab: value, bondDaiTab: 0, bondDaiLPTab: 0, bondUSDCTab: 0 });
  const handleBondDai = (e, value) => setState({ activeTab: 2, stakeTab: null, bondTab: 0, bondDaiTab: value });
  const handleBondDaiLP = (e, value) => setState({ activeTab: 2, stakeTab: null, bondTab: 1, bondDaiLPTab: value });
  const handleBondUSDC = (e, value) => setState({ activeTab: 2, stakeTab: null, bondTab: 2, bondUSDCTab: value });
  let { activeTab, stakeTab, bondTab, bondDaiTab, bondDaiLPTab, bondUSDCTab } = state;
  const { activateBrowserWallet, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  
  return (
<div>

      
      <CoreThemeProvider >
        <Modal style={{display:"none"}} 

          icon={<WindowsExplorer variant="16x16_4" />}
          title="Dao95.exe"
          width="0"

          height="0"

        />
          <TaskBar
        list={
          <List>
            <List.Item
              icon={<ReaderClosed variant="32x32_4" />}
            >
              Jvol Jvolizka
            </List.Item>
          </List>
        } />
</CoreThemeProvider>
    <ThemeProvider theme={original}>
  <Window style={{ width: 825 }}  className='window' >
          <WindowHeader  className='window-header'>
            <span>Dao95.exe</span>
        <Button>
        <span className='close-icon' ><h1>+</h1></span>
      </Button>
          </WindowHeader>

         <Toolbar>
      <Button variant='menu' size='sm'>
        Docs
      </Button>
      <Button variant='menu' size='sm' >
        Jvol
      </Button>
      <Button variant='menu' size='sm' disabled>
        Discord
      </Button>
      <Button variant='menu' size='sm' disabled>
        Telegram
      </Button>
      <Button variant='menu' size='sm' disabled>
        Governance
      </Button>
      <Button variant='menu' size='sm' disabled>
        Buy $95D
      </Button>
      <Button variant='menu' size='sm' disabled>
        Disconnect
      </Button>         
    </Toolbar>
        <marquee> <i> Defi like 1995 </i>  </marquee>
        <br />
        
          <WindowContent>
                  {account && <p>Account: {account}</p>}
                {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}
          <Checkbox
          checked={true}
          value='Whitelist'
          label='Whitelist'
          disabled={true}
          />
        <Tabs value={activeTab} onChange={handleChange}>
        <Tab value={0}>Dashboard</Tab>
        <Tab value={1}>Stake</Tab>
        <Tab value={2}>Bond</Tab>
      </Tabs>
      <TabBody >
        {activeTab === 0 && (
              <div>

            <Fieldset label='Market Cap'>
              <div >Amount:</div>
                </Fieldset>
                <br />
            <Fieldset label='Price'>
              <div>Amount:</div>
                </Fieldset>
                <br />
            <Fieldset label='Current Index'>
              <div >Amount:</div>
                </Fieldset>
                <br />
            <Fieldset label='APY'>
              <div>Amount:</div>
            </Fieldset>                   
          </div>
        )}
            {activeTab === 1 && (
              <div>
              <Fieldset >
                  <div>APY:</div>
                  <div>Total Value Deposited:</div>
                  <div>Current Index:</div>
                </Fieldset>
              <br />  
        <Tabs value={stakeTab} onChange={handleStake}>
            <Tab value={0}>Stake</Tab>
            <Tab value={2}>Unstake</Tab>
                </Tabs>
                
                <TabBody >
                {stakeTab === 0 && (
          <div>
                      <NumberField defaultValue={0} min={0}> </NumberField>
                      <Button >Max</Button>
                      <Button >Stake</Button>
          </div>
            )}
                {stakeTab === 2 && (
          <div>
                      <NumberField defaultValue={0} min={0} > </NumberField>
                      <Button >Max</Button>
                      <Button >Unstake</Button>
          </div>
            )}
                </TabBody>
                <br />
              <Fieldset >
                  <div>Unstaked Balance:</div>
                  <div>Staked Balance:</div>
                  <div>Next Reward Amount:</div>
                  <div>Next Reward Yield:</div>
                  <div>ROI (5-Day Rate):</div>
                </Fieldset>

              </div>)}

          {activeTab === 2 && (
              <div>
                  <Fieldset >
                  <div>DAI:</div>
                  <div>DAI/LP:</div>
                  <div>USDC:</div>
                </Fieldset>
              <br />  
        <Tabs value={bondTab} onChange={handleBond}>
                  <Tab value={0}>DAI Bond</Tab>
                  <Tab value={1}>DAI/LP Bond</Tab>
                  <Tab value={2}>USDC Bond</Tab>
        </Tabs>
                 
          <TabBody >
            
              {bondTab === 0 && (
                    <div>
              <Fieldset >
                  <div>Bond Price:</div>
                  <div>Market Price:</div>
                      </Fieldset>
                      <br /> 
                  <Tabs value={bondDaiTab} onChange={handleBondDai}>
                      <Tab value={0}>Bond</Tab>
                      <Tab value={1}>Redeem</Tab>
                  </Tabs>
                      <TabBody >   
                    {bondDaiTab === 0 && (
                        <div>
                          <NumberField defaultValue={0} min={0}> </NumberField>
                          <Button >Max</Button>
                          <Button >Bond</Button>
                <br />
              <Fieldset >
                  <div>Your Balance:</div>
                  <div>You Will Get:</div>
                  <div>Max You Can Buy:</div>
                  <div>ROI:</div>
                  <div>Vesting Term:</div>
                </Fieldset>                            
                        </div>)}
                    {bondDaiTab === 1 && (
                      <div>
                          <Button >Claim</Button>
                            <Button >Claim And Autostake</Button>
                <br />
              <Fieldset >
                  <div>Pending Rewards:</div>
                  <div>Claimable Rewards:</div>
                  <div>Time until fully vested:</div>
                  <div>ROI:</div>
                  <div>Vesting Term:</div>
                </Fieldset>                              
                        </div>)}
                </TabBody>        
          </div>)}
              {bondTab === 1 && (
                    <div>
              <Fieldset >
                  <div>Bond Price:</div>
                  <div>Market Price:</div>
                      </Fieldset>
                      <br /> 
                  <Tabs value={bondDaiLPTab} onChange={handleBondDaiLP}>
                      <Tab value={0}>Bond</Tab>
                      <Tab value={1}>Redeem</Tab>
                  </Tabs>
                      <TabBody >   
                    {bondDaiLPTab === 0 && (
                        <div>
                          <NumberField defaultValue={0} min={0}> </NumberField>
                          <Button >Max</Button>
                          <Button >Bond</Button>
                <br />
              <Fieldset >
                  <div>Your Balance:</div>
                  <div>You Will Get:</div>
                  <div>Max You Can Buy:</div>
                  <div>ROI:</div>
                  <div>Vesting Term:</div>
                </Fieldset>                            
                        </div>)}
                    {bondDaiLPTab === 1 && (
                      <div>
                          <Button >Claim</Button>
                            <Button >Claim And Autostake</Button>
                <br />
              <Fieldset >
                  <div>Pending Rewards:</div>
                  <div>Claimable Rewards:</div>
                  <div>Time until fully vested:</div>
                  <div>ROI:</div>
                  <div>Vesting Term:</div>
                </Fieldset>                              
                        </div>)}
                </TabBody>        
          </div>)}
              {bondTab === 2 && (
                    <div>
              <Fieldset >
                  <div>Bond Price:</div>
                  <div>Market Price:</div>
                      </Fieldset>
                      <br /> 
                  <Tabs value={bondUSDCTab} onChange={handleBondUSDC}>
                      <Tab value={0}>Bond</Tab>
                      <Tab value={1}>Redeem</Tab>
                  </Tabs>
                      <TabBody >   
                    {bondUSDCTab === 0 && (
                        <div>
                          <NumberField defaultValue={0} min={0}> </NumberField>
                          <Button >Max</Button>
                          <Button >Bond</Button>
                <br />
              <Fieldset >
                  <div>Your Balance:</div>
                  <div>You Will Get:</div>
                  <div>Max You Can Buy:</div>
                  <div>ROI:</div>
                  <div>Vesting Term:</div>
                </Fieldset>                            
                        </div>)}
                    {bondUSDCTab === 1 && (
                      <div>
                          <Button >Claim</Button>
                            <Button >Claim And Autostake</Button>
                <br />
              <Fieldset >
                  <div>Pending Rewards:</div>
                  <div>Claimable Rewards:</div>
                  <div>Time until fully vested:</div>
                  <div>ROI:</div>
                  <div>Vesting Term:</div>
                </Fieldset>                              
                        </div>)}
                </TabBody>        
          </div>)}
            </TabBody>    
              </div>
              )}
      </TabBody>
    </WindowContent>
      </Window>
      </ThemeProvider>

      </div>
);
}

export default App;
