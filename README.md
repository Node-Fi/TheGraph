# TheGraph


A graph used to gather information about daily, monthly and yearly swaps for Swap() event in SwapRouterV1.sol contract. 

Here is the corposonding graph: 
https://thegraph.com/hosted-service/subgraph/sparrett/nodefiswapanalytics

Here are some sample queries to try: 

To the volume by token and time: 

```
{
  tokens(first:5){
    id
    totalVolumeUSD
    daily_volume {
      totalVolumeUSD
      day
    }
    monthly_volume
    {
      totalVolumeUSD
      month
    }
    yearly_volume
    {
      totalVolumeUSD
      year
    }
  }
}
```

To get a the volume by tenant and time: 
(Tenant is held constant because the Swap event function currently does 
not include partner id)

```
{
  tenants(first:5){
    id
    totalVolumeUSD
    daily_volume {
      totalVolumeUSD
      day
    }
    monthly_volume
    {
      totalVolumeUSD
      month
    }
    yearly_volume
    {
      totalVolumeUSD
      year
    }
  }
}
```

DailyVolume Id's have the following structures 

```
<token_address>-<day>-<month>-<year>

or 

<tenant_id>-<day>-<month>-<year>
```

MonthlyVolume Id's have the following structures 

```
<token_address>-<month>-<year>

or 

<tenant_id>-<month>-<year>
```

MonthlyVolume Id's have the following structures

```
<token_address>-<year>

or 

<tenant_id>-<year>
```

(You can use either to get the total swaps by a specific tenant or token)

To continue development use the following commands: 

 ```
- graph codegen 

- graph deploy 

- graph deploy --product hosted-service sparrett/nodefiswapanalytics
```

