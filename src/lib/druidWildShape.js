export function draw(ctx, {
    name,
    maxCr,
    duration,
    canFly,
    canSwim,
    creatures,
}, multiplyer = 1) {

    ctx.fillStyle = 'black';
    // Character Name
    ctx.font = `${20 * multiplyer}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(name, 200 * multiplyer, 118 * multiplyer);

    // Max CR
    ctx.font = `${20 * multiplyer}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(maxCr, 398 * multiplyer, 113 * multiplyer);

    // Wild Shape Duration
    ctx.font = `${20 * multiplyer}px Arial`;
    ctx.textAlign = 'center';
    ctx.fillText(duration, 465 * multiplyer, 113 * multiplyer);

    // Swim
    if (canSwim) {
        ctx.font = `${20 * multiplyer}px Arial`;
        ctx.textAlign = 'start';
        ctx.fillText('X', 540 * multiplyer, 98 * multiplyer);
    }
    // Fly
    if (canFly) {
        ctx.font = `${20 * multiplyer}px Arial`;
        ctx.textAlign = 'start';
        ctx.fillText('X', 540 * multiplyer, 125 * multiplyer);
    }

    const CREATURE_LINE_FACTOR = 93;
    
    creatures.forEach((creature, idx) => {
        const FACTOR = CREATURE_LINE_FACTOR * idx * multiplyer;
        // Creature Name
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.name, 160 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature Size
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.size, 290 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature Speed
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.speed, 460 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature Hit Dice
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.hitDice, 568 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature Strength
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.str, 640 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature Dexterity
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.dex, 705 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature Constitution
        ctx.font = `${14 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.con, 778 * multiplyer, 224 * multiplyer + FACTOR);

        // Creature CR
        ctx.font = `${20 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.cr, 85 * multiplyer, 265 * multiplyer + FACTOR);

        // Creature HP
        ctx.font = `${20 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.hp, 142 * multiplyer, 265 * multiplyer + FACTOR);

        // Creature AC
        ctx.font = `${20 * multiplyer}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText(creature.ac, 200 * multiplyer, 265 * multiplyer + FACTOR);

        // Creature Text
        ctx.font = `${10 * multiplyer}px Arial`;
        ctx.textAlign = 'start';
        creature.details.forEach((detail, detailIdx) => {
            ctx.fillText(detail, 235 * multiplyer, 245 * multiplyer + FACTOR + (detailIdx * 10 * multiplyer));
        });
        
    });
}