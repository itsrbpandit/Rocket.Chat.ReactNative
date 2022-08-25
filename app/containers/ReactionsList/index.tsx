import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { TGetCustomEmoji } from '../../definitions/IEmoji';
import { IReaction } from '../../definitions';
import I18n from '../../i18n';
import styles from './styles';
import AllTab from './AllTab';
import UsersList from './UsersList';
import ReactionsTabBar from './ReactionsTabBar';

interface IReactionsListProps {
	baseUrl: string;
	getCustomEmoji: TGetCustomEmoji;
	reactions?: IReaction[];
	width: number;
	username: string;
}

const ReactionsList = ({ reactions, baseUrl, getCustomEmoji, width, username }: IReactionsListProps): React.ReactElement => {
	// sorting reactions in descending order on the basic of number of users reacted
	const sortedReactions = reactions?.sort((reaction1, reaction2) => reaction2.usernames.length - reaction1.usernames.length);
	const allTabLabel = { emoji: I18n.t('All'), usernames: [], names: [], _id: 'All' };
	return (
		<View style={styles.container} testID='reactionsList'>
			<ScrollableTabView renderTabBar={() => <ReactionsTabBar baseUrl={baseUrl} getCustomEmoji={getCustomEmoji} width={width} />}>
				<AllTab
					tabLabel={allTabLabel}
					reactions={sortedReactions}
					baseUrl={baseUrl}
					getCustomEmoji={getCustomEmoji}
					username={username}
				/>
				{sortedReactions?.map(reaction => (
					<UsersList tabLabel={reaction} key={reaction.emoji} />
				))}
			</ScrollableTabView>
		</View>
	);
};

export default ReactionsList;
