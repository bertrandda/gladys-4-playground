import { Link } from 'preact-router/match';
import { Text, MarkupText } from 'preact-i18n';

const ZwavePage = ({ children, ...props }) => (
  <div class="page">
    <div class="page-main">
      <div class="my-3 my-md-5">
        <div class="container">
          <div class="page-header">
            <h1 class="page-title">
              <Link href="/dashboard/integration/device" class="btn btn-secondary btn-sm btn-block" >◀️️ Back</Link>
            </h1>
          </div>
          
          <div class="row">
            <div class="col-lg-3">
              <div class="card">
                <Link href={`${props.currentUrl}/${props.integration.key}`}><img class="card-img-top" src={props.integration.img} alt={props.integration.name} /></Link>
                <div class="card-body d-flex flex-column">
                  <h4><Link href="#">{props.integration.name}</Link></h4>
                  <div class="text-muted">{props.integration.description}</div>
                  <br />
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-success btn-block">Restart</button>
                    </div>
                    <div class="col-6">
                      <button class="btn btn-danger btn-block">Stop</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-9">
              <div class="card">
                <div class="card-body">
                  <div class="dimmer">
                    <div class="dimmer-content">
                      <h2><Text id="integration.zwave.title" /></h2>
                      <p><MarkupText id="integration.zwave.introduction" /></p>

                      <h3>List of available Z-wave nodes</h3>
                      <div class="card-columns">
                        { props.zwaveNodes && props.zwaveNodes.map((zwaveNode, index) => (
                          <div class="card">
                            <div class="card-header">
                              <h3 class="card-title">{zwaveNode.product}</h3>

                            </div>
                            <div class="card-body">
                              <b>Manufacturer:</b> {zwaveNode.manufacturer} <br />
                              <b>Type:</b> {zwaveNode.type}
                            </div>
                          </div>
                        ))
                        }
                      </div>
                      <dib class="form-group">
                        <button class="btn btn-info btn-sm" onClick={props.getBridges}><Text id="integration.philipsHue.searchForBridgesButton" /> <i class="fe fe-radio" /></button>
                      </dib>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ZwavePage;