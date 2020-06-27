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

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { fixed } = this.state;
    const {
      onDijkstra,
      onDFS,
      onBFS,
      onAStar,
      onClearPathPressed,
      onClearAllPressed,
    } = this.props;

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
            <Button
              style={{ marginRight: 16 }}
              color="orange"
              onClick={() => onClearAllPressed()}
            >
              Clear Everything
            </Button>
            <Button
              style={{ marginRight: 16 }}
              color="orange"
              onClick={() => onClearPathPressed()}
            >
              Clear Path
            </Button>

            <Button
              style={{ marginRight: 16 }}
              color="red"
              onClick={() => onDijkstra()}
            >
              Visualize Dijkstra
            </Button>

            <Button
              style={{ marginRight: 16 }}
              color="red"
              onClick={() => onDFS()}
            >
              Visualize DFS
            </Button>
            <Button
              style={{ marginRight: 16 }}
              color="red"
              onClick={() => onBFS()}
            >
              Visualize BFS
            </Button>
            <Button
              style={{ marginRight: 16 }}
              color="red"
              onClick={() => onAStar()}
            >
              Visualize A*
            </Button>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}
