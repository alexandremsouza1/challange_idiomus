<?php


namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class TeamController extends Controller
{

  public function process(Request $request)
  {
    $requirements = $request->json()->all();
    if (!is_array($requirements)) {
      return response()->json(['error' => 'Invalid input format'], 400);
    }

    $players = Player::all();

    $selectedTeam = [];

    foreach ($requirements as $requirement) {
      if (!isset($requirement['position']) || !isset($requirement['mainSkill']) || !isset($requirement['numberOfPlayers'])) {
        return response()->json(['error' => 'Invalid requirement format'], 400);
      }

      $eligiblePlayers = $players->filter(function ($player) use ($requirement) {
        return $player->position === $requirement['position'];
      });

      $sortedPlayers = $eligiblePlayers->sortByDesc(function ($player) use ($requirement) {
        $skill = collect($player->playerSkills)->firstWhere('skill', $requirement['mainSkill']);
        return $skill ? $skill['value'] : 0;
      });

      $selectedPlayers = $sortedPlayers->take($requirement['numberOfPlayers']);

      if ($selectedPlayers->count() < $requirement['numberOfPlayers']) {
        return response()->json([
          'error' => "Not enough players available for position: {$requirement['position']}"
        ], 400);
      }

      $selectedTeam = array_merge($selectedTeam, $selectedPlayers->all());
    }

    return response()->json($selectedTeam);
  }

}