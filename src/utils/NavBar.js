import React, { Component } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Button,
  Segment,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const algoOptions = [
  {
    key: "Dijkstra",
    text: "Dijkstra",
    value: "1",
  },
  {
    key: "DFS",
    text: "DFS",
    value: "2",
  },
  {
    key: "BFS",
    text: "BFS",
    value: "3",
  },
  {
    key: "AStar",
    text: "A*",
    value: "4",
  },
  {
    key: "Greedy Best First Search",
    text: "Greedy Best First Search",
    value: "5",
  },
];

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = (e, { value }) => this.setState({ value });
  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { value } = this.state;
    const { chosenAlgo, onClearPathPressed, onClearAllPressed } = this.props;

    return (
      <Menu fixed="top" inverted style={{ backgroundColor: "#061830" }}>
        <Container>
          <Menu.Item as="a" header>
            <Image
              size="mini"
              src={require("../assets/compass.png")}
              style={{ marginRight: "1.5em" }}
            />
            Pathfinding Visualizer
          </Menu.Item>
          <Menu.Item position="centre">
            <Dropdown
              onChange={this.handleChange}
              options={algoOptions}
              placeholder="Select algorithm"
              selection
              value={value}
            />
            <Button
              style={{ marginLeft: 16 }}
              color="green"
              onClick={() => chosenAlgo(value)}
            >
              Run
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              color="orange"
              onClick={() => onClearAllPressed()}
            >
              Clear Everything
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              color="orange"
              onClick={() => onClearPathPressed()}
            >
              Clear Path
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
