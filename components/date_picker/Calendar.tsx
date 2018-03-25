import * as React from 'react';

import { range } from '../utils/utils';
import time from '../utils/time';
import { CalendarMonth } from './CalendarMonth';
import { IconButton } from '../button/IconButton';

const DIRECTION_STEPS = { left: -1, right: 1 };

export interface CalendarTheme {
  active?: string,
  calendar?: string,
  next?: string,
  prev?: string,
  years?: string,
  button?: string
  calendarWrapper?: string,
  date?: string,
  dialog?: string,
  header?: string,
  monthsDisplay?: string,
  year?: string,
  yearsDisplay?: string,
}
export interface CalendarProps {
  disabledDates?: Date[],
  enabledDates?: Date[],
  minDate?: Date,
  maxDate?: Date,
  selectedDate?: Date,
  sundayFirstDayOfWeek?: boolean,
  display?: 'years' | 'months',
  locale?: string ;
  theme?: CalendarTheme;
  handleSelect?(event?:React.MouseEvent<HTMLElement>),
  onChange?(date: Date, forces?: boolean),
}
export class Calendar extends React.Component<CalendarProps> {

  // static propTypes = {
  //   disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  //   display: PropTypes.oneOf(['months', 'years']),
  //   enabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  //   handleSelect: PropTypes.func,
  //   locale: PropTypes.oneOfType([
  //     PropTypes.string,
  //     PropTypes.object,
  //   ]),
  //   maxDate: PropTypes.instanceOf(Date),
  //   minDate: PropTypes.instanceOf(Date),
  //   onChange: PropTypes.func,
  //   selectedDate: PropTypes.instanceOf(Date),
  //   sundayFirstDayOfWeek: PropTypes.bool,
  //   theme: PropTypes.shape({
  //     active: PropTypes.string,
  //     calendar: PropTypes.string,
  //     next: PropTypes.string,
  //     prev: PropTypes.string,
  //     years: PropTypes.string,
  //   }),
  // };

  static defaultProps = {
    display: 'months',
    selectedDate: new Date(),
  };

  state = {
    viewDate: this.props.selectedDate,
  };
  private activeYearNode;
  private yearsNode;
  componentWillMount() {
    document.body.addEventListener('keydown', this.handleKeys);
  }

  componentDidUpdate() {
    if (this.activeYearNode) {
      this.scrollToActive();
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeys);
  }

  scrollToActive() {
    const offset = (this.yearsNode.offsetHeight / 2) + (this.activeYearNode.offsetHeight / 2);
    this.yearsNode.scrollTop = this.activeYearNode.offsetTop - offset;
  }

  handleDayClick = (day) => {
    this.props.onChange(time.setDay(this.state.viewDate, day) as Date, true);
  };

  handleYearClick = (event) => {
    const year = parseInt(event.currentTarget.id, 10);
    const viewDate = time.setYear(this.props.selectedDate, year);
    this.setState({ viewDate });
    this.props.onChange(viewDate, false);
  };

  handleKeys = (e) => {
    const { selectedDate } = this.props;

    if (e.which === 37 || e.which === 38 || e.which === 39 || e.which === 40 || e.which === 13) {
      e.preventDefault();
    }

    switch (e.which) {
      case 13:
        this.props.handleSelect();
        break; // enter
      case 37:
        this.handleDayArrowKey(time.addDays(selectedDate, -1));
        break; // left
      case 38:
        this.handleDayArrowKey(time.addDays(selectedDate, -7));
        break; // up
      case 39:
        this.handleDayArrowKey(time.addDays(selectedDate, 1));
        break; // right
      case 40:
        this.handleDayArrowKey(time.addDays(selectedDate, 7));
        break; // down
      default:
        break;
    }
  };

  handleDayArrowKey = (date) => {
    this.setState({ viewDate: date });
    this.props.onChange(date, false);
  };

  changeViewMonth = (event) => {
    const direction = event.currentTarget.id;
    this.setState({
      direction,
      viewDate: time.addMonths(this.state.viewDate, DIRECTION_STEPS[ direction ]),
    });
  };

  renderYears() {
    return (
      <ul
        data-react-toolbox="years"
        className={this.props.theme.years}
        ref={(node) => {
          this.yearsNode = node;
        }}
      >
        {range(1900, 2100).map(year => (
          <li
            className={year === this.state.viewDate.getFullYear() ? this.props.theme.active : ''}
            id={year}
            key={year}
            onClick={this.handleYearClick}
            ref={(node) => {
              if (year === this.state.viewDate.getFullYear()) {
                this.activeYearNode = node;
              }
            }}
          >
            {year}
          </li>
        ))}
      </ul>
    );
  }

  renderMonths() {
    const { theme } = this.props;
    //const animation = this.state.direction === 'left' ? 'slideLeft' : 'slideRight';
    //const animationModule = getAnimationModule(animation, theme);
    return (
      <div data-react-toolbox="calendar">
        <IconButton id="left" className={theme.prev} icon="chevron_left" onClick={this.changeViewMonth}/>
        <IconButton id="right" className={theme.next} icon="chevron_right" onClick={this.changeViewMonth}/>
        <CalendarMonth
          enabledDates={this.props.enabledDates}
          disabledDates={this.props.disabledDates}
          key={this.state.viewDate.getMonth()}
          locale={this.props.locale}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          onDayClick={this.handleDayClick}
          selectedDate={this.props.selectedDate}
          sundayFirstDayOfWeek={this.props.sundayFirstDayOfWeek}
          theme={this.props.theme}
          viewDate={this.state.viewDate}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={this.props.theme.calendar}>
        {this.props.display === 'months' ? this.renderMonths() : this.renderYears()}
      </div>
    );
  }
}

export default Calendar;
